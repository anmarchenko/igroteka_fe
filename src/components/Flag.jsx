import React from 'react';
import PropTypes from 'prop-types';

import './Flag.css';

const Flag = ({ country, size }) => (
  <img
    className="Flag"
    src={`/flags/${size}/${country.toLowerCase()}.png`}
    alt={`${country} flag`}
  />
);

Flag.propTypes = {
  country: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Flag.defaultProps = {
  size: 16,
};

export default Flag;
