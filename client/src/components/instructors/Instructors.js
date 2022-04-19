//This is the Instructor component which will display of all instructors in the database

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getInstructors } from '../../actions/instructor';

const Instructors = ({ getInstructors, instructor }) => {
  useEffect(() => {
    getInstructors();
    instructor.map((item) => {
      console.log(item);
    });
  }, [getInstructors]);

  const displayInstructor = () => {
    return (
      <div>
        {instructor[0].map((item) => (
          <div>
            <p>{item.lastName}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Instructors</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop" /> This is the list of all
          instructors
        </p>
        <div className="profiles">my instructors</div>
        <div>{displayInstructor()}</div>
      </Fragment>
    </section>
  );
};

Instructors.propTypes = {
  instructor: PropTypes.array.isRequired,
  getInstructors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  instructor: state.instructor,
});

export default connect(mapStateToProps, { getInstructors })(Instructors);
