//This is the Instructor component which will display of all instructors in the database

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getInstructors } from '../../actions/instructor';
import InstructorItem from './InstructorItem';
import { Link } from 'react-router-dom';

const Instructors = ({
  getInstructors,
  instructor: { instructor, loading },
}) => {
  useEffect(() => {
    getInstructors();
    loading === false && console.log(instructor);
  }, [getInstructors]);

  const displayInstructor = () => {
    return (
      <div>
        {instructor.map((item) => (
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
          <h1 className="large text-primary">Instructors</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> List of instructors
          </p>
          <Link to="/add-instructor" className="btn btn-light">
            <i className="fab fa-black-tie text-primary" /> Add Instructor
          </Link>
          <br />
          <br />
          <div className="profiles">
            {instructor.length > 0 ? (
              instructor.map((item) => (
                <InstructorItem key={item._id} instructor={item} />
              ))
            ) : (
              <h4>No requests found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Instructors.propTypes = {
  instructor: PropTypes.object.isRequired,
  getInstructors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  instructor: state.instructor, //this is our combined instructor reducer (aka our state)
});

export default connect(mapStateToProps, { getInstructors })(Instructors);

/*
  instructor.map((item) => {
      console.log(item);
    });




  



*/
