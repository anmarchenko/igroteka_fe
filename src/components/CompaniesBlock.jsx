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
          <>
            <Link
              to={`/companies/${company.id}/${suffix}`}
              key={company.id}
              className="CompaniesBlock-link"
            >
              {company.name}
            </Link>
            {index < companies.length - 1 ? ', ' : ''}
          </>
        );
      })}
    </div>
  );
};

CompaniesBlock.propTypes = {
  companies: PropTypes.array.isRequired,
  suffix: PropTypes.string.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

CompaniesBlock.defaultProps = {
  header: '',
};

export default CompaniesBlock;
