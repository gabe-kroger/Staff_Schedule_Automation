//This is the Instructor component which will display of all instructors in the database

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Courses = ({ course }) => {
  useEffect(() => {
    console.log('hello world');
  }, []);

  const displayCourse = () => {
    return (
      <div>
        {course.map((item) => (
          <div>
            <p>{item.courseTitle}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Classes</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop" /> This is the list of all
          classes
        </p>
        <div className="profiles">my classes</div>
      </Fragment>
    </section>
  );
};

Courses.propTypes = {
  course: PropTypes.array.isRequired,
  // getCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps)(Courses);
