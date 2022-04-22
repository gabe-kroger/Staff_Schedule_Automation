import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseItemTwo = ({
  course: { courseTitle, courseNumber, disciplines },
}) => {
  return (
    <div className="profile bg-light">
      <div>
        <h2>{courseTitle}</h2>
        <p>
          {'Course Number:'} {courseNumber && <span> {courseNumber}</span>}
        </p>
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

CourseItemTwo.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItemTwo;
