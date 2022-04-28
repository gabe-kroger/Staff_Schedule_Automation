import React, { useEffect, Fragment, useState } from 'react';
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
import { generateSchedule, getSchedules } from '../../actions/schedule';
import ScheduleItem from '../schedules/ScheduleItem';

const Dashboard = ({
  getCurrentProfile,
  generateSchedule,
  getInstructors,
  getCourses,
  getSchedules,
  instructor: { instructor, loading },
  course: { course },
  schedule: { schedule, scheduleSelected },
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getInstructors();
    getCourses();
    getSchedules();
  }, [getCurrentProfile]);

  const [scheduleLoading, setLoading] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  /*const genSchdule = async () => {
    setLoading(true);

    const res = await fetch('/api/schedule/generate', {
      method: 'POST',
    }).then(function (data) {
      setLoading(false);
      refreshPage();
    });
    return await res.json();
  };
  */

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <>
        <section className="container">
          {scheduleLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className="large text-primary">Schedule</h1>
              <p className="lead"></p>
              <div className="profiles">
                {schedule.length > 0 ? (
                  schedule.map((item) => (
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
                      onClick={() => generateSchedule()}
                    >
                      <i className="fas fa-user-minus" /> Generate Schedule
                    </button>
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </section>

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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  instructor: state.instructor,
  course: state.course,
  schedule: state.schedule,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  generateSchedule,
  deleteAccount,
  getInstructors,
  getCourses,
  getSchedules,
})(Dashboard);

/*  These components go below line 28.  I'll use these for "Add Instructor" and "Add Course"
         <Experience experience={profile.experience} />
          <Education education={profile.education} />
*/
