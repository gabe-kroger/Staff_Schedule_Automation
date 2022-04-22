import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/users';
import { approveUser } from '../../actions/users';
import { useState } from 'react';

const UserItem = ({
  users: { _id, name, email, avatar, userStatus, role },
  deleteUser,
  approveUser,
}) => {
  const [formData, setFormData] = useState({
    userStatus: true,
  });
  //reload window after denying user
  const reloadAfterDelete = (id) => {
    deleteUser(id);
    return window.location.reload();
  };

  //reload window after approving user
  const reloadAfterApprove = (id, formData) => {
    approveUser(id, formData);
    return window.location.reload();
  };
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
          onClick={() => reloadAfterApprove(_id, formData)}
        >
          <i className="fas fa-user-minus" /> Approve
        </button>
        <button
          className="btn btn-danger"
          onClick={() => reloadAfterDelete(_id)}
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

export default connect(null, { deleteUser, approveUser })(UserItem);
