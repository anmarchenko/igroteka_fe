import React from 'react';
import PropTypes from 'prop-types';

import './IconWithText.css';

export const IconWithText = ({
  icon, color, size, label,
}) => (
  <span className="IconWithText">
    {icon({ color, size })}
    <span className="IconWithText-text">
      {label}
    </span>
  </span>
);

IconWithText.propTypes = {
  icon: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default IconWithText;
