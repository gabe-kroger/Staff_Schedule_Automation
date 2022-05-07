import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Users from './components/users/Users';
import InstructorForm from './components/instructor-forms/InstructorForm';
import CourseForm from './components/course-forms/CourseForm';
import ScheduleForm from './components/schedule-forms/ScheduleForm';
import Courses from './components/courses/Courses';
import Instructors from './components/instructors/Instructors';
import EditInstructor from './components/instructor-forms/EditInstructor';
import EditCourse from './components/course-forms/EditCourse';
import EditSchedule from './components/schedules/EditSchedule';

//import Profiles from './components/profiles/Profiles';
//import Profile from './components/profile/Profile';
//import Posts from './components/posts/Posts';
//import Post from './components/post/Post';
//import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route
            path='dashboard'
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path='users' element={<PrivateRoute component={Users} />} />
          <Route
            path='create-profile'
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path='edit-profile'
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path='add-experience'
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path='add-education'
            element={<PrivateRoute component={AddEducation} />}
          />
          <Route
            path='instructor'
            element={<PrivateRoute component={Instructors} />}
          />
          <Route
            path='add-instructor'
            element={<PrivateRoute component={InstructorForm} />}
          />
          <Route
            path='edit-instructor'
            element={<PrivateRoute component={EditInstructor} />}
          />
          <Route path='course' element={<PrivateRoute component={Courses} />} />
          <Route
            path='add-course'
            element={<PrivateRoute component={CourseForm} />}
          />
          <Route
            path='add-schedule'
            element={<PrivateRoute component={ScheduleForm} />}
          />
          <Route
            path='edit-course'
            element={<PrivateRoute component={EditCourse} />}
          />
          <Route
            path='edit-schedule'
            element={<PrivateRoute component={EditSchedule} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
