//This is the Instructor component which will display of all instructors in the database

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Courses = ({ getInstructors, instructor }) => {
  useEffect(() => {
    console.log('hello world');
  }, []);

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

/*
Instructors.propTypes = {
  instructor: PropTypes.array.isRequired,
  getInstructors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  instructor: state.instructor,
});
*/

export default connect()(Courses);
