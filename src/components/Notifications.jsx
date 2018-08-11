import React from 'react';
import PropTypes from 'prop-types';

import { NotificationStack } from 'react-notification';
import { connect } from 'react-redux';

import { DISMISS_NOTIFICATION } from '../store/notifications';

export const Notifications = ({ notifications, dismissNotification }) => (
  <NotificationStack
    notifications={notifications.toArray()}
    onDismiss={notification => dismissNotification(notification)}
  />
);

Notifications.propTypes = {
  notifications: PropTypes.shape({
    toArray: PropTypes.func,
  }),
  dismissNotification: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  notifications: undefined,
};

const mapStateToProps = state => ({
  notifications: state.notifications.list,
});

const mapDispatchToProps = dispatch => ({
  dismissNotification(notification) {
    dispatch({ type: DISMISS_NOTIFICATION, notification });
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
