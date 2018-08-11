import React from 'react';
import { Provider } from 'react-redux';

import {
  Redirect, Switch, Route, Router,
} from 'react-router-dom';

import Login from './Login';
import MyBacklog from './MyBacklog';
import GuestRoute from './GuestRoute';
import PrivateRoute from './PrivateRoute';
import SessionContainer from './SessionContainer';
import NotFound from './NotFound';
import TopNav from './TopNav';
import Notifications from './Notifications';

import store from '../store';
import history from '../store/history';

export const App = () => (
  <Provider store={store}>
    <SessionContainer>
      <Router history={history}>
        <main role="main">
          <TopNav />

          <Switch>
            <Redirect exact from="/" to="/collections/wishlist" />

            <GuestRoute path="/sign_in" component={Login} />
            <PrivateRoute path="/collections/:status" component={MyBacklog} />
            <Route component={NotFound} />
          </Switch>

          <Notifications />
        </main>
      </Router>
      <footer className="text-muted">
        <div className="container">
          <p>
            Designed and built by
            {' '}
            <a href="https://github.com/altmer" target="_blank" rel="noopener noreferrer">
              @altmer
            </a>
          </p>
          <p>
            Powered by
            {' '}
            <a href="https://giantbomb.com" target="_blank" rel="noopener noreferrer">
              Giantbomb
            </a>
          </p>
        </div>
      </footer>
    </SessionContainer>
  </Provider>
);

export default App;
