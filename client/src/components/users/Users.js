import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { getUsers } from '../../actions/users';

const Users = ({ getUsers, users: { users, loading } }) => {
  useEffect(() => {
    getUsers(); //loading the users from the server

    //mapping though the loaded users
    if (loading === false) {
      users.map((item) => {
        item.userStatus === false
          ? console.log(item)
          : console.log('theres nothing');
      });
    }
  }, [getUsers]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Requests</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Approve or deny user
            requests
          </p>
          <div className="profiles">
            {users.length > 0 ? (
              users.map((item) =>
                item.userStatus === false ? (
                  <UserItem key={item._id} users={item} />
                ) : null
              )
            ) : (
              <h4>No requests found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(Users);
