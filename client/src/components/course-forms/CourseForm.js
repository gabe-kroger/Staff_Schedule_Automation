import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourses, createCourse } from '../../actions/course';
import Spinner from '../layout/Spinner';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our courseData
 */
const initialState = {
  courseNumber: '',
  courseTitle: '',
  disciplines: '',
};

const CourseForm = ({
  course: { course, loading },
  createCourse,
  getCourses,
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingCourse = useMatch('/add-course');

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
    // if there is no course, attempt to fetch one
    /* if (!course) getCourses();

    // if we finished loading and we do have a course
    // then build our courseData
    if (!loading && course) {
      const courseData = { ...initialState };
      for (const key in course) {
        if (key in courseData) courseData[key] = course[key];
      }

      // the disciplines may be an array from our API response
      if (Array.isArray(courseData.disciplines))
        courseData.disciplines = courseData.disciplines.join(', ');
      // set local state with the courseData
      setFormData(courseData);
    }
    */
  }, [getCourses]);

  const { courseNumber, courseTitle, disciplines } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (courseNumber !== '' && courseTitle !== '' && disciplines !== '') {
      createCourse(formData, navigate);
    }
    getCourses();
  };

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Create Course</h1>
          <p className="lead">
            <i className="fas fa-user" />
            Let's get some information to make a course
          </p>
          <small>* = required field</small>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Course Number"
                name="courseNumber"
                value={courseNumber}
                onChange={onChange}
              />
              <small className="form-text">Enter the course number</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Course Title"
                name="courseTitle"
                value={courseTitle}
                onChange={onChange}
              />
              <small className="form-text">Enter the course title</small>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="* Disciplines"
                name="disciplines"
                value={disciplines}
                onChange={onChange}
              />
              <small className="form-text">
                Please use comma separated values (eg. Programming 1,
                Programming 2)
              </small>
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

CourseForm.propTypes = {
  createCourse: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { createCourse, getCourses })(
  CourseForm
);
