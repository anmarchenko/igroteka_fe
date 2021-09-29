import React from 'react';
import PropTypes from 'prop-types';

import './Logo.css';

const placeholder = 'https://dummyimage.com/100x100/3b323b/3b323b.png';

export const Logo = ({ url }) => (
  <img alt="company logo" src={url || placeholder} className="Logo" />
);

Logo.propTypes = {
  url: PropTypes.string,
};

Logo.defaultProps = {
  url: placeholder,
};

export default Logo;
