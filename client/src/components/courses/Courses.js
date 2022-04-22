//This is the course component which will display of all Courses in the database

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCourses } from '../../actions/course';
import CourseItem from './CourseItem';
import { Link } from 'react-router-dom';

const Courses = ({ getCourses, course: { course, loading } }) => {
  useEffect(() => {
    getCourses();
    loading === false && console.log(course);
  }, [getCourses]);

  const displayCourse = () => {
    return (
      <div>
        {course.map((item) => (
          <div>
            <p key={item.lastName}>{item.lastName}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Courses</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> List of Courses
          </p>
          <Link to="/add-course" className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary" /> Add Course
          </Link>
          <br />
          <br />

          <div className="profiles">
            {course.length > 0 ? (
              course.map((item) => <CourseItem key={item._id} course={item} />)
            ) : (
              <h4>No requests found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Courses.propTypes = {
  course: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course, //this is our combined course reducer (aka our state)
});

export default connect(mapStateToProps, { getCourses })(Courses);

/*
  course.map((item) => {
      console.log(item);
    });




  



*/
