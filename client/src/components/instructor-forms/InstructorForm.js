import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInstructors, createInstructor } from '../../actions/instructor';
import Spinner from '../layout/Spinner';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our instructorData
 */
const initialState = {
  lastName: '',
  maxClasses: 0,
  disciplines: '',
};

const InstructorForm = ({
  instructor: { instructor, loading },
  createInstructor,
  getInstructors,
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingInstructor = useMatch('/add-instructor');

  const navigate = useNavigate();

  useEffect(() => {
    getInstructors();
    // if there is no instructor, attempt to fetch one
    /* if (!instructor) getInstructors();

    // if we finished loading and we do have a instructor
    // then build our instructorData
    if (!loading && instructor) {
      const instructorData = { ...initialState };
      for (const key in instructor) {
        if (key in instructorData) instructorData[key] = instructor[key];
      }

      // the disciplines may be an array from our API response
      if (Array.isArray(instructorData.disciplines))
        instructorData.disciplines = instructorData.disciplines.join(', ');
      // set local state with the instructorData
      setFormData(instructorData);
    }
    */
  }, [loading, getInstructors, instructor]);

  const { lastName, maxClasses, disciplines } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createInstructor(formData, navigate, instructor ? true : false);
  };

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">
            {creatingInstructor ? 'Create Instructor' : 'Edit Instructor'}
          </h1>
          <p className="lead">
            <i className="fas fa-user" />
            {creatingInstructor
              ? ` Let's get some information to make an instructor`
              : ' Add some changes to an existing instructor'}
          </p>
          <small>* = required field</small>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
              <small className="form-text">
                Enter the instructor's last name
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="0"
                name="maxClasses"
                value={maxClasses}
                onChange={onChange}
              />
              <small className="form-text">Enter max classes</small>
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

InstructorForm.propTypes = {
  createInstructor: PropTypes.func.isRequired,
  getInstructors: PropTypes.func.isRequired,
  instructor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  instructor: state.instructor,
});

export default connect(mapStateToProps, { createInstructor, getInstructors })(
  InstructorForm
);
