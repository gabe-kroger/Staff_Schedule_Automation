// This Component is retrieving alert state from the reducer, then we'll display this in our UI
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //anything we want to interact a component with Redux, we want to use connect

const Alert = (
  { alerts } //destructuring our alerts prop from below
) =>
  alerts !== null && // making sure alerts isn't null
  alerts.length > 0 && //making sure that there's actually something in our alerts prop.
  alerts.map(
    (
      alert //mapping through our alert, then outputting that alert in a div with a corresponding style.
    ) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    )
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//we need to map the alert state from our reducer to a props variable, that way we can pass it around.
const mapStateToProps = (state) => ({
  alerts: state.alert, //we put the state inside a props called alert and we'll pass this
});

export default connect(mapStateToProps)(Alert);
