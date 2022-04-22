import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const InstructorItemTwo = ({
  instructor: { lastName, maxClasses, assignedClasses, disciplines },
}) => {
  return (
    <div className="profile bg-light">
      <div>
        <h2>{lastName}</h2>
        <p>
          {'Max Classes:'} {maxClasses && <span> {maxClasses}</span>}
        </p>
        <p className="my-1">
          {<span>{'Assigned Classes: ' + assignedClasses}</span>}
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

InstructorItemTwo.propTypes = {
  instructor: PropTypes.object.isRequired,
};

export default InstructorItemTwo;
