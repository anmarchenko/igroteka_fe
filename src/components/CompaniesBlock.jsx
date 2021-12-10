import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './CompaniesBlock.css';

export const CompaniesBlock = ({ companies, header, suffix }) => {
  if (!companies || companies.length === 0) {
    return <span />;
  }

  return (
    <div className="CompaniesBlock">
      <span className="CompaniesBlock-label">{header}</span>
      {companies.map((company, index) => {
        return (
          <span key={company.id}>
            <Link
              to={`/companies/${company.id}/${suffix}`}
              className="CompaniesBlock-link"
            >
              {company.name}
            </Link>
            {index < companies.length - 1 ? ', ' : ''}
          </span>
        );
      })}
    </div>
  );
};

CompaniesBlock.propTypes = {
  companies: PropTypes.array,
  suffix: PropTypes.string.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

CompaniesBlock.defaultProps = {
  companies: [],
  header: '',
};

export default CompaniesBlock;
