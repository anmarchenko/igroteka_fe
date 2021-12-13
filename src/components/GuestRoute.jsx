/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('phoenixAuthToken');

const GuestRoute = ({ children, ...rest }) => (
  <Route {...rest}>
    {isAuthenticated() ? <Redirect to="/" push /> : children}
  </Route>
);

GuestRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestRoute;
