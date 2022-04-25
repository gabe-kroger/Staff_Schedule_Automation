import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteInstructor, selectedInstructor } from '../../actions/instructor';

const InstructorItem = ({
  instructor,
  deleteInstructor,
  selectedInstructor,
}) => {
  const reloadAfterDelete = (id) => {
    deleteInstructor(id);
    return window.location.reload();
  };

  return (
    <div className="profile bg-light">
      <img alt="" className="round-img" />

      <div>
        <h2>{instructor.lastName}</h2>
        <p>
          {'Max Classes:'}{' '}
          {instructor.maxClasses && <span> {instructor.maxClasses}</span>}
        </p>
        <p className="my-1">
          {<span>{'Assigned Classes: ' + instructor.assignedClasses}</span>}
        </p>
        <Link to="/edit-instructor">
          <button
            className="btn btn-primary"
            onClick={() => selectedInstructor(instructor)}
          >
            <i className="fas fa-user-minus" /> Edit
          </button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => reloadAfterDelete(instructor._id)}
        >
          <i className="fas fa-user-minus" /> Delete
        </button>
      </div>
      <ul>
        {instructor.disciplines.slice(0, 4).map((discipline, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {discipline}
          </li>
        ))}
      </ul>
    </div>
  );
};

InstructorItem.propTypes = {
  instructor: PropTypes.object.isRequired,
};

export default connect(null, { deleteInstructor, selectedInstructor })(
  InstructorItem
);
