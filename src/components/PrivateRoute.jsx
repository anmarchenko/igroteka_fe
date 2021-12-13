/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('phoenixAuthToken');

const PrivateRoute = ({ children, ...rest }) => (
  <Route {...rest}>
    {isAuthenticated() ? children : <Redirect to="/sign_in" />}
  </Route>
);

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
