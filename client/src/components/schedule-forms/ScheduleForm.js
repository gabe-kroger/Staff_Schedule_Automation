import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchedules, createSchedule } from '../../actions/schedule';
import { getTimeslots } from '../../actions/timeslot';
import Spinner from '../layout/Spinner';

const initialState = {};

const ScheduleForm = ({
  schedule: { schedule },
  createSchedule,
  getSchedules,
  getTimeslots,
  timeslot: { timeslot },
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingSchedule = useMatch('/add-schedule');

  const navigate = useNavigate();

  useEffect(() => {
    getSchedules();
    getTimeslots();
  }, [getSchedules]);

  const { classID, crn, instructor, scheduledTime } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      classID !== '' &&
      crn !== '' &&
      instructor !== '' &&
      scheduledTime !== ''
    ) {
      createSchedule(formData, navigate);
    }
    getSchedules();
  };

  return (
    <section className='container'>
      <Fragment>
        <h1 className='large text-primary'>Create Instructor</h1>
        <p className='lead'>
          <i className='fas fa-user' />
          Let's get some information to make an section
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Class ID'
              name='classID'
              value={classID}
              onChange={onChange}
            />
            <small className='form-text'>Enter the classID</small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='CRN'
              name='crn'
              value={crn}
              onChange={onChange}
            />
            <small className='form-text'>Enter a valid crn</small>
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='* Instructor'
              name='instructor'
              value={instructor}
              onChange={onChange}
            />
            <small className='form-text'>
              please enter a instructors last name
            </small>
          </div>

          <div className='form-group'>
            <select
              placeholder='scheduledTime'
              name='scheduledTime'
              value={scheduledTime}
              onChange={onChange}
              defaultValue={0}
            >
              <option value='0' disabled>
                Select a timeslot
              </option>
              {timeslot.length > 0 ? (
                timeslot.map((item) => (
                  <option key={item.timeslot} value={item.timeslot}>
                    {item.timeslot}
                  </option>
                ))
              ) : (
                <option value='0'>No timeslots to choose from</option>
              )}
            </select>
            <small className='form-text'>Please select day and time</small>
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </Fragment>
    </section>
  );
};

ScheduleForm.propTypes = {
  createSchedule: PropTypes.func.isRequired,
  getSchedules: PropTypes.func.isRequired,
  schedule: PropTypes.object.isRequired,
  timeslot: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  schedule: state.schedule,
  timeslot: state.timeslot,
});

export default connect(mapStateToProps, {
  createSchedule,
  getSchedules,
  getTimeslots,
})(ScheduleForm);
