import React from 'react';
import PropTypes from 'prop-types';

import {
  PlusCircle,
  MinusCircle,
  ExternalLink as FeatherExternalLink,
} from 'react-feather';

import OpencriticTier from './OpencriticTier';
import CircularProgress from './CircularProgress';
import ExternalLink from './ExternalLink';
import ReviewCard from './ReviewCard';

import './Reviews.css';

const Reviews = ({ rating }) => (
  <>
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
    <ExternalLink
      label="All reviews"
      url={`https://opencritic.com/game/${rating.external_id}/a`}
    >
      <FeatherExternalLink />
    </ExternalLink>
    {rating.summary && (
      <>
        <p className="text-description">{rating.summary}</p>
        {rating.points &&
          rating.points.map((p) => (
            <p className="Reviews-point text-description" key={p.title}>
              {p.state == 'pro' ? (
                <PlusCircle color="green" />
              ) : (
                <MinusCircle color="red" />
              )}
              <b>{p.title}</b>: {p.description}
            </p>
          ))}
      </>
    )}
    <div className="Reviews-cards">
      {rating.reviews &&
        rating.reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
    </div>
  </>
);

Reviews.propTypes = {
  rating: PropTypes.shape({
    score: PropTypes.number,
    percent_recommended: PropTypes.number,
    tier: PropTypes.string,
    summary: PropTypes.string,
    external_id: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape({})),
    reviews: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default Reviews;
