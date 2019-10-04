/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import './CriticsRating.css';

const backgroundColor = (rating) => {
  if (rating > 89) {
    return '#1B5E20';
  }
  if (rating > 79) {
    return '#388E3C';
  }
  if (rating > 69) {
    return '#4CAF50';
  }
  if (rating > 59) {
    return '#8BC34A';
  }
  if (rating > 49) {
    return '#FBC02D';
  }
  if (rating > 39) {
    return '#FFB300';
  }
  if (rating > 29) {
    return '#F57F17';
  }
  if (rating > 19) {
    return '#FF5722';
  }
  if (rating > 9) {
    return '#E64A19';
  }
  return '#BF360C';
};

const backgroundStyle = (rating) => {
  if (!rating) return null;
  return { backgroundColor: backgroundColor(rating) };
};

const CriticsRating = ({ rating, ratings_count }) => (
  <div className="CriticsRating" style={backgroundStyle(rating)} title={`Based on ${ratings_count} ratings`}>
    {Math.round(rating)}
  </div>
);

CriticsRating.propTypes = {
  rating: PropTypes.number.isRequired,
  ratings_count: PropTypes.number.isRequired,
};

export default CriticsRating;
