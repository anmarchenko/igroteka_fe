import React from 'react';
import PropTypes from 'prop-types';

import IconWithText from './IconWithText';

export const BacklogStatusLabel = ({ status, size, color }) => (
  <IconWithText
    Icon={status.icon}
    color={color || status.color}
    size={size}
    label={status.label}
  />
);

BacklogStatusLabel.propTypes = {
  status: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
    color: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
};

BacklogStatusLabel.defaultProps = {
  color: null,
};

export default BacklogStatusLabel;
