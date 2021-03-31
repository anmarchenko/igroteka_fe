import React from 'react';
import PropTypes from 'prop-types';

import Reviews from './Reviews';

const GameTabReviews = ({ rating }) => (
  <div className="row GamePage-extended">
    <div className="col-12">
      {rating.score && rating.score > 0 && <Reviews rating={rating} />}
    </div>
  </div>
);
GameTabReviews.propTypes = {
  rating: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }),
};

export default GameTabReviews;
