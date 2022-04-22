import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/profile';

const UserItem = ({
  users: { _id, name, email, avatar, userStatus, role },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {'Requesting for'} {role && <span> {role}</span>}
        </p>
        <p className="my-1">
          {email && <span>{'Current status is ' + userStatus.toString()}</span>}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => console.log('approve')}
        >
          <i className="fas fa-user-minus" /> Approve
        </button>
        <button
          className="btn btn-danger"
          onClick={() => console.log('delete')}
        >
          <i className="fas fa-user-minus" /> Deny
        </button>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  users: PropTypes.object.isRequired,
};

export default UserItem;
