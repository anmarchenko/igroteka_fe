import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import './CompanyTabs.css';

const CompanyTabs = ({ companyId }) => (
  <div className="row CompanyTabs">
    <div className="col-12">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/companies/${companyId}/developed`}
            activeClassName="active"
          >
            Developed games
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/companies/${companyId}/published`}
            activeClassName="active"
          >
            Published games
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

CompanyTabs.propTypes = {
  companyId: PropTypes.number.isRequired,
};

export default CompanyTabs;
