import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Poster from './Poster';
import { yearFromDate, renderDate, gameScoreById } from '../utils';

import './BacklogItem.css';

const expectationRatingText = {
  1: 'Not likely',
  2: 'Maybe',
  3: 'Interesting',
  4: 'Wanted',
  5: 'Must play',
};

const expectationRatingStyle = {
  1: 'badge-light',
  2: 'badge-light',
  3: 'badge-secondary',
  4: 'badge-warning',
  5: 'badge-danger',
};

const renderExpectationRating = (score) => (
  <span className={`badge badge-pill ${expectationRatingStyle[score]}`}>
    {expectationRatingText[score]}
  </span>
);

const renderScore = (score) => (
  <span className={`badge badge-pill ${score.badgeStyle}`}>
    {score.label}
  </span>
);

export const BacklogItem = (props) => {
  const { entry } = props;
  const scoreItem = gameScoreById(entry.score);

  return (
    <li className="BacklogItem">
      <div className="BacklogItem-poster d-none d-sm-block">
        <Link to={`/games/${entry.game_id}/show`}>
          <Poster url={entry.poster_thumb_url} />
        </Link>
      </div>
      <div className="BacklogItem-main">
        <p className="BacklogItem-name">
          <Link to={`/games/${entry.game_id}/show`}>{entry.game_name}</Link>
          <small>{yearFromDate(entry.game_release_date)}</small>
        </p>
        {!!entry.owned_platform_name && (
          <p className="BacklogItem-platform text-important">{entry.owned_platform_name}</p>
        )}
        {!!entry.note && <p className="font-italic">{entry.note}</p>}
      </div>
      <div className="BacklogItem-important">
        {['wishlist', 'backlog'].includes(entry.status) && (
          <p>{entry.expectation_rating && renderExpectationRating(entry.expectation_rating)}</p>
        )}
        {entry.status === 'beaten' && (
          <p>{entry.score && renderScore(scoreItem)}</p>
        )}
        {entry.status === 'beaten' && <p>{entry.finished_at && renderDate(entry.finished_at)}</p>}
      </div>
    </li>
  );
};

BacklogItem.propTypes = {
  entry: PropTypes.shape({
    inserted_at: PropTypes.string,

    game_id: PropTypes.number,
    game_name: PropTypes.string,
    game_release_date: PropTypes.string,
    poster_thumb_url: PropTypes.string,

    status: PropTypes.string,

    note: PropTypes.string,
    score: PropTypes.number,
    expectation_rating: PropTypes.number,
    owned_platform_name: PropTypes.string,
    finished_at: PropTypes.string,

    available_platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default BacklogItem;
