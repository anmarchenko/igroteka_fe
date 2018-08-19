import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

export const Avatar = ({ color, initials }) => <div className={`Avatar ${color}`}>{initials}</div>;

Avatar.propTypes = {
  color: PropTypes.string,
  initials: PropTypes.string,
};

Avatar.defaultProps = {
  color: '',
  initials: '',
};

export default Avatar;
