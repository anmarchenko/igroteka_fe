import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('phoenixAuthToken');

const GuestRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? <Redirect to="/" push /> : React.createElement(component, props))
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default GuestRoute;
