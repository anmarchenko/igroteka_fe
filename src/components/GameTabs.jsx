import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const GameTabs = ({ gameId, showReviews }) => (
  <div className="row GameTabs">
    <div className="col-12">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/games/${gameId}/info`}
            activeClassName="active"
          >
            Info
          </NavLink>
        </li>
        {showReviews && (
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={`/games/${gameId}/reviews`}
              activeClassName="active"
            >
              Reviews
            </NavLink>
          </li>
        )}

        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/games/${gameId}/media`}
            activeClassName="active"
          >
            Media
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);
GameTabs.propTypes = {
  gameId: PropTypes.string.isRequired,
  showReviews: PropTypes.bool.isRequired,
};

export default GameTabs;
