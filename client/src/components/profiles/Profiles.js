import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles(); //loading the profiles from the server

    //mapping though the loaded profiles
    if (loading === false) {
      profiles.map((item) => {
        item.user.userStatus === false
          ? console.log(item)
          : console.log('theres nothing');
      });
    }
  }, [getProfiles]);

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
            {profiles.length > 0 ? (
              profiles.map((profile) =>
                profile.user.userStatus === false ? (
                  <ProfileItem key={profile._id} profile={profile} />
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

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
