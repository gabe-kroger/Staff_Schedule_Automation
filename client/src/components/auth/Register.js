import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'; //we're connecting this component to redux
import { setAlert } from '../../actions/alert'; //we bring in this alert action, then pass it into connect() below;
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  //destructuring setAlert and pulling it from props
  //This is our form data object which is stored in state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    password2: '',
  });

  const { name, email, role, password, password2 } = formData; //Destructuring to save space in the future.

  //onChange function that uses our setter function (setFormData), then uses the spread operator to copy the destructured variables inside formData, then we want to change our name state to the value of the input.
  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //onSubmit function
  const onSubmit = async (event) => {
    event.preventDefault(); //always prevent default for submit functions.
    if (password !== password2) {
      //set an alert that says "passwords don't match" and pass in the setAlert props.
      setAlert('passwords need to match', 'danger'); // these are the msg and alertType parameters.
    } else {
      register({ name, email, role, password }); // the 'success' parameter changes css color to green
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  //in the input section, we use the term 'required' to add client-side validation
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(event) => onSubmit(event)}>
        <div className="form-group">
          <input
            onChange={(event) => onChange(event)}
            value={name}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={(event) => onChange(event)}
            value={email}
            type="email"
            placeholder="Email Address"
            name="email"
            required
          />
        </div>
        {/*         <div className="form-groupp">
          <input
            onChange={(event) => onChange(event)}
            value={role}
            type="text"
            placeholder="User Role"
            name="role"
            required
          />
        </div> */}

        <div className="form-group">
          <select
            onChange={(event) => onChange(event)}
            value={role}
            placeholder="User Role"
            name="role"
            required
          >
            <option value={'Root'}>Root</option>
            <option value={'Admin'}>Admin</option>
            <option value={'Assistant'}>Assistant</option>
          </select>
        </div>

        <div className="form-group">
          <input
            onChange={(event) => onChange(event)}
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={(event) => onChange(event)}
            value={password2}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register); //we're exporting this component being connected in redux
