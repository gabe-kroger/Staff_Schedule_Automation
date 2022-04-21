import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseItem = ({ course: { courseTitle, courseNumber, disciplines } }) => {
  return (
    <div className="profile bg-light">
      <img alt="" className="round-img" />

      <div>
        <h2>{courseTitle}</h2>
        <p>
          {'Course Number:'} {courseNumber && <span> {courseNumber}</span>}
        </p>
        <p className="my-1">{<span>{'Course Functions: '}</span>}</p>
        <button className="btn btn-primary" onClick={() => console.log('Edit')}>
          <i className="fas fa-user-minus" /> Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => console.log('Delete')}
        >
          <i className="fas fa-user-minus" /> Delete
        </button>
      </div>
      <ul>
        {disciplines.slice(0, 4).map((discipline, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {discipline}
          </li>
        ))}
      </ul>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItem;
