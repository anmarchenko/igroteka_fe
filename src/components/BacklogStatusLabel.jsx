import React from 'react';
import PropTypes from 'prop-types';

import IconWithText from './IconWithText';

export const BacklogStatusLabel = ({ status, size }) => (
  <IconWithText Icon={status.icon} color={status.color} size={size} label={status.label} />
);

BacklogStatusLabel.propTypes = {
  status: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
    color: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BacklogStatusLabel;
