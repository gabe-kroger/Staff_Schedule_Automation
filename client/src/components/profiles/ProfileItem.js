import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/profile';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, userStatus, role },
    status,
    company,
    location,
    skills,
  },
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
          {location && (
            <span>{'Current status is ' + userStatus.toString()}</span>
          )}
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
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
