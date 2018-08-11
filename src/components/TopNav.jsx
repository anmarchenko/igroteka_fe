import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search } from 'react-feather';
import {
  Navbar, NavbarBrand, Nav, NavItem,
} from 'reactstrap';

import UserMenu from './UserMenu';
import { SIGN_OUT_REQUESTED } from '../store/login';

import './TopNav.css';

export class TopNav extends Component {
  userMenu() {
    const { currentUser, signOut } = this.props;
    if (currentUser) {
      return <UserMenu user={currentUser} signOut={signOut} />;
    }
    return null;
  }

  login() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return (
        <NavItem>
          <Link to="/sign_in" className="nav-link">
            Login
          </Link>
        </NavItem>
      );
    }
    return null;
  }

  collection() {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <NavItem>
          <Link to="/collections/wishlist" className="nav-link">
            My collection
          </Link>
        </NavItem>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="container">
        <Navbar light className="TopNav my-2" expand="xs">
          <NavbarBrand href="/">
Igroteka
          </NavbarBrand>
          <Nav navbar className="mr-auto">
            <NavItem>
              <Link to="/search" className="search-opener nav-link">
                <Search />
                <span className="d-none d-xs-none d-sm-none d-md-inline">
Search
                </span>
              </Link>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            {this.collection()}
            {this.login()}
            {this.userMenu()}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

TopNav.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
  }),
  signOut: PropTypes.func.isRequired,
};

TopNav.defaultProps = {
  currentUser: undefined,
};

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch({ type: SIGN_OUT_REQUESTED });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNav);
