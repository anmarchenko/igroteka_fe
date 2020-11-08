/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { scoreColor } from '../utils';

import './CriticsRating.css';

const backgroundStyle = (rating) => {
  if (!rating) return null;
  return { backgroundColor: scoreColor(rating) };
};

const CriticsRating = ({ rating, ratings_count }) => (
  <div
    className="CriticsRating"
    style={backgroundStyle(rating)}
    title={`Based on ${ratings_count} ratings`}
  >
    {Math.round(rating)}
  </div>
);

CriticsRating.propTypes = {
  rating: PropTypes.number,
  ratings_count: PropTypes.number,
};

CriticsRating.defaultProps = {
  rating: null,
  ratings_count: null,
};

export default CriticsRating;
