import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'react-feather';

import BacklogStatusLabel from './BacklogStatusLabel';
import IconWithText from './IconWithText';
import UserMenu from './UserMenu';
import { BACKLOG_STATUSES } from '../constants';

import { SIGN_OUT_REQUESTED } from '../store/login';

import './MobileNavBar.css';

const MobileNavBar = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();

  if (!currentUser) {
    return null;
  }
  return (
    <nav className="MobileNavBar d-sm-none">
      <ul className="list-unstyled components">
        {BACKLOG_STATUSES.map((status) => (
          <li key={status.id} className="MobileNavBar-nav-item">
            <NavLink
              className="MobileNavBar-nav-link"
              to={`/collections/${status.id}`}
              activeClassName="active"
            >
              <BacklogStatusLabel status={status} size={24} color="#000" />
            </NavLink>
          </li>
        ))}
        <li className="MobileNavBar-nav-item">
          <NavLink
            to="/search"
            className="MobileNavBar-nav-link"
            activeClassName="active"
          >
            <IconWithText
              Icon={Search}
              label="Search"
              color="black"
              size={24}
            />
          </NavLink>
        </li>
        <UserMenu
          user={currentUser}
          signOut={() => dispatch({ type: SIGN_OUT_REQUESTED })}
          short
        />
      </ul>
    </nav>
  );
};

export default MobileNavBar;
