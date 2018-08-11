import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { CURRENT_USER_REQUESTED } from '../store/login';

export class SessionContainer extends Component {
  componentDidMount() {
    const { fetchCurrentUser } = this.props;
    if (localStorage.getItem('phoenixAuthToken')) {
      fetchCurrentUser();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div className="session-area">
        {children}
      </div>
    );
  }
}

SessionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser() {
    dispatch({ type: CURRENT_USER_REQUESTED });
  },
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(SessionContainer);
