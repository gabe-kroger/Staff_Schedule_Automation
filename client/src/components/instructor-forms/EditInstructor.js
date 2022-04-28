import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getInstructors,
  updateInstructor,
  selectedInstructor,
} from '../../actions/instructor';
import Spinner from '../layout/Spinner';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our instructorData
 */

const InstructorForm = ({
  instructor: { instructor, loading, instructorSelected },
  updateInstructor,
  getInstructors,
}) => {
  const initialState = {
    lastName: instructorSelected.lastName,
    maxClasses: instructorSelected.maxClasses,
    disciplines: instructorSelected.disciplines,
  };

  const [formData, setFormData] = useState(initialState);

  const creatingInstructor = useMatch('/edit-instructor');

  const navigate = useNavigate();

  useEffect(() => {
    getInstructors();

    /*
    const instructorData = { ...initialState };
    for (const key in instructor) {
      if (key in instructorData) instructorData[key] = instructor[key];

      // the disciplines may be an array from our API response
      if (Array.isArray(instructorData.disciplines))
        instructorData.disciplines = instructorData.disciplines.join(', ');
      // set local state with the instructorData
      setFormData(instructorData);
      */
  }, [getInstructors]);

  const { lastName, maxClasses, disciplines } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      lastName !== '' &&
      maxClasses !== '' &&
      disciplines !== '' &&
      maxClasses !== 0
    ) {
      updateInstructor(instructorSelected._id, formData, navigate);
    }
    getInstructors();
  };

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">
            {`Edit Instructor ${instructorSelected.lastName}`}
          </h1>
          <p className="lead">
            <i className="fas fa-user" />
            {'Lets add some changes to an existing instructor'}
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
                placeholder={maxClasses}
                name="maxClasses"
                value={maxClasses}
                onChange={onChange}
              />
              <small className="form-text">Enter max classes (1-4)</small>
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
  updateInstructor: PropTypes.func.isRequired,
  getInstructors: PropTypes.func.isRequired,
  selectedInstructor: PropTypes.func.isRequired,
  instructor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  instructor: state.instructor,
});

export default connect(mapStateToProps, {
  updateInstructor,
  getInstructors,
  selectedInstructor,
})(InstructorForm);
