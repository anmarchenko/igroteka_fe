import React from 'react';
import { Provider } from 'react-redux';

import { Redirect, Switch, Route, Router } from 'react-router-dom';

import Login from './Login';
import Backlog from './Backlog';
import GuestRoute from './GuestRoute';
import PrivateRoute from './PrivateRoute';
import SessionContainer from './SessionContainer';
import NotFound from './NotFound';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import GlobalSearch from './GlobalSearch';
import GamePage from './GamePage';
import MyProfile from './MyProfile';
import ChangePassword from './ChangePassword';
import TopGames from './TopGames';
import NewGames from './NewGames';
import CompanyPage from './CompanyPage';

import store from '../store';
import history from '../store/history';
import MobileNavBar from './MobileNavBar';

export const App = () => (
  <Provider store={store}>
    <SessionContainer>
      <Router history={history}>
        <Sidebar />
        <MobileNavBar />
        <main role="main">
          <Switch>
            <Redirect exact from="/" to="/collections/wishlist" />

            <GuestRoute path="/sign_in">
              <Login />
            </GuestRoute>

            <PrivateRoute path="/search">
              <GlobalSearch />
            </PrivateRoute>
            <PrivateRoute path="/collections/:status">
              <Backlog />
            </PrivateRoute>
            <PrivateRoute path="/games/:gameId">
              <GamePage />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <MyProfile />
            </PrivateRoute>
            <PrivateRoute path="/change_password">
              <ChangePassword />
            </PrivateRoute>
            <PrivateRoute path="/top">
              <TopGames />
            </PrivateRoute>
            <PrivateRoute path="/new">
              <NewGames />
            </PrivateRoute>
            <PrivateRoute path="/companies/:companyId">
              <CompanyPage />
            </PrivateRoute>

            <Route>
              <NotFound />
            </Route>
          </Switch>

          <Notifications />
        </main>
      </Router>
    </SessionContainer>
  </Provider>
);

export default App;
