import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const InstructorItem = ({
  item: { lastName, maxClasses, assignedClasses, disciplines },
}) => {
  return (
    <div className="profile bg-light">
      <div>
        <h2>{lastName}</h2>
        <p>
          {'maxClasses'} {maxClasses && <span> {maxClasses}</span>}
        </p>
        <p className="my-1">
          {assignedClasses && (
            <span>{'Assigned classes are ' + assignedClasses}</span>
          )}
        </p>
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
        {disciplines.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {disciplines}
          </li>
        ))}
      </ul>
    </div>
  );
};

InstructorItem.propTypes = {
  instructor: PropTypes.array.isRequired,
};

export default InstructorItem;
