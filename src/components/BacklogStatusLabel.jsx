import React from 'react';
import PropTypes from 'prop-types';

import './BacklogStatusLabel.css';

export const BacklogStatusLabel = ({ status, size }) => (
  <span className="BacklogStatusLabel">
    {status.icon({ color: status.color, size })}
    <span className="BacklogStatusLabel-text">
      {status.label}
    </span>
  </span>
);

BacklogStatusLabel.propTypes = {
  status: PropTypes.shape({
    icon: PropTypes.func,
    color: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BacklogStatusLabel;
