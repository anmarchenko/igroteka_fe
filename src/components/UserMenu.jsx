import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import Avatar from './Avatar';

import './UserMenu.css';

export const UserMenu = ({ user, signOut }) => (
  <UncontrolledDropdown nav className="UserMenu">
    <DropdownToggle className="nav-link" tag="a">
      <Avatar {...user} />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem className="user-link" tag={Link} to="/profile">
        My profile
      </DropdownItem>
      <DropdownItem divider className="d-xs-inline d-sm-none" />
      <DropdownItem
        className="user-link d-xs-inline d-sm-none"
        tag={Link}
        to="/collections/wishlist"
      >
        My collection
      </DropdownItem>
      <DropdownItem className="user-link d-xs-inline d-sm-none" tag={Link} to="/top">
        Top games
      </DropdownItem>
      <DropdownItem divider className="d-xs-inline d-sm-none" />
      <DropdownItem className="user-link" tag={Link} to="/change_password">
        Change password
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="user-link" onClick={signOut}>
        Sign out
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

UserMenu.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.shape({
      thumb: PropTypes.string,
    }),
    initials: PropTypes.string,
    color: PropTypes.string,
  }),
  signOut: PropTypes.func.isRequired,
};

UserMenu.defaultProps = {
  user: {
    avatar: {
      thumb: null,
    },
  },
};

export default UserMenu;
