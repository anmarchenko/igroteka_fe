import React from 'react';
import PropTypes from 'prop-types';

import './Poster.css';

const placeholder = 'https://dummyimage.com/100x100/3b323b/3b323b.png';

export const Poster = ({ url }) => (
  <img alt="game poster" src={url || placeholder} className="GamePoster" />
);

Poster.propTypes = {
  url: PropTypes.string,
};

Poster.defaultProps = {
  url: placeholder,
};

export default Poster;
