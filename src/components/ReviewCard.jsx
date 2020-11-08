import React from 'react';
import PropTypes from 'prop-types';

import './ReviewCard.css';

const ReviewCard = ({ review }) => (
  <div className="ReviewCard card">
    <div className="card-body">
      <h5 className="card-title">{review.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{review.score} / 100</h6>
      <p className="card-text">{review.snippet}</p>
      <a href={review.external_url} className="card-link">
        Read full review
      </a>
    </div>
  </div>
);

ReviewCard.propTypes = {
  review: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    snippet: PropTypes.string,
    external_url: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;
