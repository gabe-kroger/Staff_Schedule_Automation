import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getInstructors } from '../../actions/instructor';
import { getCollisions } from '../../actions/collision';
import InstructorItemTwo from '../instructors/InstructorItemTwo';
import Spinner from '../layout/Spinner';
import { getCourses } from '../../actions/course';
import CourseItemTwo from '../courses/CourseItemTwo';
import { generateSchedule, getSchedules } from '../../actions/schedule';
import ScheduleItem from '../schedules/ScheduleItem';
import CollisionItem from '../collisions/CollisionItem';

const Dashboard = ({
  getCurrentProfile,
  generateSchedule,
  getInstructors,
  getCourses,
  getSchedules,
  instructor: { instructor, loading },
  course: { course },
  schedule,
  deleteAccount,
  auth: { user },
  profile: { profile },
  getCollisions,
  collision: { collision },
}) => {
  useEffect(() => {
    getSchedules();
    getCurrentProfile();
    getInstructors();
    getCourses();
    getCollisions();
  }, [getSchedules]);

  // const [scheduleLoading, setLoading] = useState(false);
  const [collisionLoading, setLoading1] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  const genSchdule = async () => {
    setLoading(true);

    const res = await fetch('/api/schedule/generate', {
      method: 'POST',
    }).then(function (data) {
      setLoading(false);
      refreshPage();
    });
    return await res.json();
  };

  const ckCollision = async () => {
    setLoading1(true);

    const res = await fetch('/api/collisions/check', {
      method: 'POST',
    }).then(function (data) {
      setLoading1(false);
      refreshPage();
    });
    return await res.json();
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <>
        <section className="container">
          {schedule.loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className="large text-primary">Class Sections</h1>
              <p className="lead"></p>
              <div className="profiles">
                <button
                  className="btn btn-primary"
                  onClick={() => genSchdule()}
                >
                  <i className="fas fa-user-minus" /> Generate New Schedule
                </button>
                <Link className="btn btn-dark my-1" to="/add-schedule">
                  Add Section
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => ckCollision()}
                >
                  <i className="fas fa-user-minus" /> Check Schedule
                </button>
                <section className="container">
                  {collisionLoading ? (
                    <Spinner />
                  ) : (
                    <Fragment>
                      <h3 className="text-primary">Errors</h3>
                      <p className="lead"></p>
                      <div className="profiles">
                        {collision.length > 0 ? (
                          collision.map((item) => (
                            <CollisionItem key={item._id} collision={item} />
                          ))
                        ) : (
                          <div>
                            <p className="lead">No errors in this schedule!</p>
                          </div>
                        )}
                      </div>
                    </Fragment>
                  )}
                </section>
                {schedule.schedule.length > 0 ? (
                  schedule.schedule.map((item) => (
                    <ScheduleItem key={item._id} schedule={item} />
                  ))
                ) : (
                  <div>
                    <p className="lead">
                      No schedule available generate one by clicking the button
                      below
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => genSchdule()}
                    >
                      <i className="fas fa-user-minus" /> Generate Schedule
                    </button>
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </section>

        <section className={'container'}>
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
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getInstructors: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  getSchedules: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  collision: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  instructor: state.instructor,
  course: state.course,
  schedule: state.schedule,
  collision: state.collision,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  generateSchedule,
  deleteAccount,
  getInstructors,
  getCourses,
  getSchedules,
  getCollisions,
})(Dashboard);

/*  These components go below line 28.  I'll use these for "Add Instructor" and "Add Course"
         <Experience experience={profile.experience} />
          <Education education={profile.education} />
*/
