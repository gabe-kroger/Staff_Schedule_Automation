import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSchedules,
  updateSchedule,
  selectedSchedule,
} from '../../actions/schedule';
import Spinner from '../layout/Spinner';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our scheduleData
 */

const EditSchedule = ({
  schedule: { schedule, loading, scheduleSelected },
  updateSchedule,
  getSchedules,
}) => {
  const initialState = {
    classID: scheduleSelected.classID,
    crn: scheduleSelected.crn,
    courseTitle: scheduleSelected.courseTitle,
    instructor: scheduleSelected.instructor,
    scheduledTime: scheduleSelected.scheduledTime,
  };

  const [formData, setFormData] = useState(initialState);

  const creatingSchedule = useMatch('/edit-schedule');

  const navigate = useNavigate();

  useEffect(() => {
    getSchedules();

    /*
    const scheduleData = { ...initialState };
    for (const key in schedule) {
      if (key in scheduleData) scheduleData[key] = schedule[key];

      // the disciplines may be an array from our API response
      if (Array.isArray(scheduleData.disciplines))
        scheduleData.disciplines = scheduleData.disciplines.join(', ');
      // set local state with the scheduleData
      setFormData(scheduleData);
      */
  }, [getSchedules]);

  const { classID, crn, courseTitle, scheduledTime, instructor } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      classID !== null &&
      crn !== '' &&
      courseTitle !== '' &&
      scheduledTime !== '' &&
      instructor !== ''
    ) {
      updateSchedule(scheduleSelected._id, formData, navigate);
    }
    getSchedules();
  };

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">
            {`Edit Schedule ${scheduleSelected.classID}`}
          </h1>
          <p className="lead">
            <i className="fas fa-user" />
            {'Lets add some changes to an existing schedule'}
          </p>
          <small>* = required field</small>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="crn"
                name="crn"
                value={crn}
                onChange={onChange}
              />
              <small className="form-text">Enter the schedule's crn</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder={classID}
                name="classID"
                value={classID}
                onChange={onChange}
              />
              <small className="form-text">Enter class ID</small>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="courseTitle"
                name="courseTitle"
                value={courseTitle}
                onChange={onChange}
              />
              <small className="form-text">Please enter course title</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="scheduledTime"
                name="scheduledTime"
                value={scheduledTime}
                onChange={onChange}
              />
              <small className="form-text">Please enter scheduled time</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="instructor"
                name="instructor"
                value={instructor}
                onChange={onChange}
              />
              <small className="form-text">Please enter instructor</small>
            </div>

            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">
              Go Back
            </Link>
          </form>
        </Fragment>
      )}
    </section>
  );
};

EditSchedule.propTypes = {
  updateSchedule: PropTypes.func.isRequired,
  getSchedules: PropTypes.func.isRequired,
  selectedSchedule: PropTypes.func.isRequired,
  schedule: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  schedule: state.schedule,
});

export default connect(mapStateToProps, {
  updateSchedule,
  getSchedules,
  selectedSchedule,
})(EditSchedule);