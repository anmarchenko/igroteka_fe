import React from 'react';
import { NavLink } from 'react-router-dom';
import { Award, Eye, Search } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';

import BacklogStatusLabel from './BacklogStatusLabel';
import IconWithText from './IconWithText';
import { BACKLOG_STATUSES } from '../constants';
import UserMenu from './UserMenu';
import { SIGN_OUT_REQUESTED } from '../store/login';

import './Sidebar.css';

const Sidebar = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();

  if (!currentUser) {
    return (
      <nav className="Sidebar d-none d-sm-block">
        <div className="Sidebar-header">igroteka</div>
      </nav>
    );
  }
  return (
    <nav className="Sidebar d-none d-sm-block">
      <div className="Sidebar-header">igroteka</div>
      <ul className="list-unstyled components">
        <li className="Sidebar-nav-item">
          <NavLink
            to="/search"
            className="Sidebar-nav-link"
            activeClassName="active"
          >
            <IconWithText Icon={Search} color="#000" size={18} label="Search" />
          </NavLink>
        </li>
      </ul>
      <p>Library</p>
      <ul className="list-unstyled components">
        {BACKLOG_STATUSES.map((status) => (
          <li key={status.id} className="Sidebar-nav-item">
            <NavLink
              className="Sidebar-nav-link"
              to={`/collections/${status.id}`}
              activeClassName="active"
            >
              <BacklogStatusLabel status={status} size={18} color="#000" />
            </NavLink>
          </li>
        ))}
      </ul>
      <p>Explore</p>
      <ul className="list-unstyled components">
        <li className="Sidebar-nav-item">
          <NavLink
            to="/new"
            className="Sidebar-nav-link"
            activeClassName="active"
          >
            <IconWithText Icon={Eye} color="#000" size={18} label="New games" />
          </NavLink>
        </li>
        <li className="Sidebar-nav-item">
          <NavLink
            to="/top"
            className="Sidebar-nav-link"
            activeClassName="active"
          >
            <IconWithText
              Icon={Award}
              color="#000"
              size={18}
              label="Top games"
            />
          </NavLink>
        </li>
      </ul>
      <ul className="list-unstyled components Sidebar-footer">
        <UserMenu
          user={currentUser}
          signOut={() => dispatch({ type: SIGN_OUT_REQUESTED })}
        />
      </ul>
    </nav>
  );
};

export default Sidebar;
