import React from 'react';
import PropTypes from 'prop-types';

import { User } from 'react-feather';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import IconWithText from './IconWithText';

import './UserMenu.css';

export const UserMenu = ({ user, signOut, short }) => (
  <UncontrolledDropdown nav className="UserMenu">
    <DropdownToggle className="nav-link" tag="a">
      <IconWithText
        Icon={User}
        label={short ? 'Profile' : user.name}
        color={'#000'}
        size={24}
      />
    </DropdownToggle>
    <DropdownMenu end>
      <DropdownItem className="user-link" tag={Link} to="/profile">
        My profile
      </DropdownItem>
      <DropdownItem divider className="d-xs-inline d-sm-none" />
      <DropdownItem
        className="user-link d-xs-inline d-sm-none"
        tag={Link}
        to="/new"
      >
        New games
      </DropdownItem>
      <DropdownItem
        className="user-link d-xs-inline d-sm-none"
        tag={Link}
        to="/top"
      >
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
    name: PropTypes.string,
  }),
  signOut: PropTypes.func.isRequired,
  short: PropTypes.bool,
};

UserMenu.defaultProps = {
  user: {
    avatar: {
      thumb: null,
    },
  },
  short: false,
};

export default UserMenu;
