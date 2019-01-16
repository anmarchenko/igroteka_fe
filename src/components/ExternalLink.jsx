import React from 'react';
import PropTypes from 'prop-types';

import './ExternalLink.css';

const ExternalLink = ({ url, children, label }) => (
  <div className="ExternalLink">
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
      {label}
    </a>
  </div>
);

ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ExternalLink;
