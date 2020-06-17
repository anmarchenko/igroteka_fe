/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('phoenixAuthToken');

const GuestRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect to="/" push />
      ) : (
        React.createElement(component, props)
      )
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.any]).isRequired,
};

export default GuestRoute;
