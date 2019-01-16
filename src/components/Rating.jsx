import React from 'react';
import PropTypes from 'prop-types';
import ReactRating from 'react-rating';

import Star from '../icons/Star';

const Rating = ({ color, ...props }) => (
  <ReactRating
    emptySymbol={<Star filled={false} color={color} />}
    fullSymbol={<Star filled color={color} />}
    {...props}
  />
);

Rating.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Rating;
