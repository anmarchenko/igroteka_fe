import React from 'react';
import PropTypes from 'prop-types';

import OpencriticTier from './OpencriticTier';
import CircularProgress from './CircularProgress';

import './Reviews.css';

// const renderPoints = (points) => (
//   points.map((p) => )
// )

const Reviews = ({ rating }) => (
  <>
    <h4>Critic reviews</h4>
    <div className="Reviews-stats">
      <div className="Reviews-stat">
        <div className="Review-stat-data">
          <OpencriticTier tier={rating.tier} />
        </div>
        <div className="Review-stat-label">OpenCritic Rating</div>
      </div>
      <div className="Reviews-stat">
        <div className="Review-stat-data">
          <CircularProgress
            score={rating.percent_recommended}
            label={`${Math.round(rating.percent_recommended)}%`}
          />
        </div>
        <div className="Review-stat-label">Critics recommend</div>
      </div>
      <div className="Reviews-stat">
        <div className="Review-stat-data">
          <CircularProgress
            score={rating.score}
            label={`${Math.round(rating.score)}`}
          />
        </div>
        <div className="Review-stat-label">Top critics rating</div>
      </div>
    </div>
    {rating.summary && (
      <>
        <p>{rating.summary}</p>
      </>
    )}
  </>
);

Reviews.propTypes = {
  rating: PropTypes.shape({
    score: PropTypes.number,
    percent_recommended: PropTypes.number,
    tier: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
};

export default Reviews;
