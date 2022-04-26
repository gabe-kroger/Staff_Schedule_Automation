import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  //This is our form data stored in state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userStatus: '',
  });

  const { email, password, userStatus } = formData; //Destructuring to save space in the future.

  //onChange function that uses our setter function (setFormData), then uses the spread operator to copy the destructured variables inside formData, then we want to change our name state to the value of the input.
  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //onSubmit function
  const onSubmit = async (event) => {
    event.preventDefault(); //always prevent default for submit functions.
    login(email, password, userStatus);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  //in the input section, we use the term 'required' to add client-side validation
  return (
    <Fragment>
      <h1 className='large text-primary'>Log In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={(event) => onSubmit(event)}>
        <div className='form-group'>
          <input
            onChange={(event) => onChange(event)}
            value={email}
            type='email'
            placeholder='Email Address'
            name='email'
            required
          />
        </div>
        <div className='form-group'>
          <input
            onChange={(event) => onChange(event)}
            value={password}
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            required
          />
        </div>
        {/*         <div className="form-group">
          <input
            onChange={(event) => onChange(event)}
            value={userStatus}
            type="text"
            placeholder="Status"
            name="userStatus"
            maxLength="4"
            required
          />
        </div> */}
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
