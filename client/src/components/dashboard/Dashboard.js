import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getInstructors } from '../../actions/instructor';
import InstructorItemTwo from '../instructors/InstructorItemTwo';
import Spinner from '../layout/Spinner';
import { getCourses } from '../../actions/course';
import CourseItemTwo from '../courses/CourseItemTwo';

const Dashboard = ({
  getCurrentProfile,
  getInstructors,
  getCourses,
  instructor: { instructor, loading },
  course: { course },
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getInstructors();
    getCourses();
  }, [getCurrentProfile]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <section className="container">
            {loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <h1 className="large text-primary">Instructors</h1>
                <p className="lead">
                  <i className="fab fa-connectdevelop" /> List of instructors
                </p>
                <div className="profiles">
                  {instructor.length > 0 ? (
                    instructor.map((item) => (
                      <InstructorItemTwo key={item._id} instructor={item} />
                    ))
                  ) : (
                    <h4>No requests found...</h4>
                  )}
                </div>
              </Fragment>
            )}
          </section>

          <section className="container">
            {course.loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <h1 className="large text-primary">Courses</h1>
                <p className="lead">
                  <i className="fab fa-connectdevelop" /> List of Courses
                </p>
                <div className="profiles">
                  {course.length > 0 ? (
                    course.map((item) => (
                      <CourseItemTwo key={item._id} course={item} />
                    ))
                  ) : (
                    <h4>No requests found...</h4>
                  )}
                </div>
              </Fragment>
            )}
          </section>

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getInstructors: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  instructor: state.instructor,
  course: state.course,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getInstructors,
  getCourses,
})(Dashboard);

/*  These components go below line 28.  I'll use these for "Add Instructor" and "Add Course"
         <Experience experience={profile.experience} />
          <Education education={profile.education} />
*/
