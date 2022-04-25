import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCourse, selectedCourse } from '../../actions/course';

const CourseItem = ({ course, deleteCourse, selectedCourse }) => {
  const reloadAfterDelete = (id) => {
    deleteCourse(id);
    return window.location.reload();
  };

  return (
    <div className="profile bg-light">
      <img alt="" className="round-img" />

      <div>
        <h2>{course.courseTitle}</h2>
        <p>
          {'Course Number:'}{' '}
          {course.courseNumber && <span> {course.courseNumber}</span>}
        </p>
        <p className="my-1">{<span>{'Course Functions: '}</span>}</p>
        <Link to="/edit-course">
          <button
            className="btn btn-primary"
            onClick={() => selectedCourse(course)}
          >
            <i className="fas fa-user-minus" /> Edit
          </button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => reloadAfterDelete(course._id)}
        >
          <i className="fas fa-user-minus" /> Delete
        </button>
      </div>
      <ul>
        {course.disciplines.slice(0, 4).map((discipline, index) => (
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

export default connect(null, { deleteCourse, selectedCourse })(CourseItem);
