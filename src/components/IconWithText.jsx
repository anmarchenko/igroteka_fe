import React from 'react';
import PropTypes from 'prop-types';

import './IconWithText.css';

export const IconWithText = ({
  Icon, color, size, label,
}) => (
  <span className="IconWithText">
    <Icon color={color} size={size} />
    <span className="IconWithText-text">{label}</span>
  </span>
);

IconWithText.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]).isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default IconWithText;
