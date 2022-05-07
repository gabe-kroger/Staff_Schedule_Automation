import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';

const Navbar = ({
  getCurrentProfile,
  profile: { profile },
  auth: { user, isAuthenticated },
  logout,
}) => {
  const authLinks = (
    <ul>
      <li>
        {user && user.role == 'Root' && <Link to='/users'>Requests</Link>}
      </li>

      <li>
        {user && user.role == 'Admin' && (
          <Link to='/instructor'>Instructors</Link>
        )}
      </li>
      <li>
        {user && user.role == 'Root' && (
          <Link to='/instructor'>Instructors</Link>
        )}
      </li>

      <li>
        {user && user.role == 'Admin' && <Link to='/course'>Courses</Link>}
      </li>
      <li>
        {user && user.role == 'Root' && <Link to='/course'>Courses</Link>}
      </li>

      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> ADTAA
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(Navbar);
