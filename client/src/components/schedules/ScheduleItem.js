import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSchedule, selectedSchedule } from '../../actions/schedule';

const ScheduleItem = ({ schedule, deleteSchedule, selectedSchedule }) => {
  //deletes selected schedule
  const reloadAfterDelete = (id) => {
    deleteSchedule(id);
    return window.location.reload();
  };

  return (
    <div className='profile bg-light'>
      <div className='left'>
        <h2>{schedule.courseTitle}</h2>
        <p>
          {'Class ID:'} {schedule.classID && <span> {schedule.classID}</span>}
        </p>
        <p>
          {'Instructor:'}{' '}
          {schedule.instructor && <span> {schedule.instructor}</span>}
        </p>
      </div>
      <div className='right'>
        <Link to='/edit-schedule'>
          <button
            className='btn btn-primary'
            onClick={() => selectedSchedule(schedule)}
          >
            <i className='fas fa-user-minus' /> Edit
          </button>
        </Link>
        <button
          className='btn btn-danger'
          onClick={() => reloadAfterDelete(schedule._id)}
        >
          <i className='fas fa-user-minus' /> Delete
        </button>
      </div>
    </div>
  );
};

ScheduleItem.propTypes = {
  schedule: PropTypes.object.isRequired,
};

export default connect(null, { deleteSchedule, selectedSchedule })(
  ScheduleItem
);
