import React from 'react';
import { Provider } from 'react-redux';

import {
  Redirect, Switch, Route, Router,
} from 'react-router-dom';

import Login from './Login';
import Backlog from './Backlog';
import GuestRoute from './GuestRoute';
import PrivateRoute from './PrivateRoute';
import SessionContainer from './SessionContainer';
import NotFound from './NotFound';
import TopNav from './TopNav';
import Notifications from './Notifications';
import GlobalSearch from './GlobalSearch';
import GamePage from './GamePage';
import MyProfile from './MyProfile';
import ChangePassword from './ChangePassword';
import TopGames from './TopGames';
import NewGames from './NewGames';

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

            <PrivateRoute path="/search" component={GlobalSearch} />
            <PrivateRoute path="/collections/:status" component={Backlog} />
            <PrivateRoute path="/games/:gameId/show" component={GamePage} />
            <PrivateRoute path="/profile" component={MyProfile} />
            <PrivateRoute path="/change_password" component={ChangePassword} />
            <PrivateRoute path="/top" component={TopGames} />
            <PrivateRoute path="/new" component={NewGames} />

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
            <a href="https://igdb.com" target="_blank" rel="noopener noreferrer">
              IGDB
            </a>
          </p>
        </div>
      </footer>
    </SessionContainer>
  </Provider>
);

export default App;
