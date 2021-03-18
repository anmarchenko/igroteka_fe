import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Poster from './Poster';
import Flag from './Flag';
import PlaythroughTimeInfo from './PlaythroughTimeInfo';
import OpencriticScore from './OpencriticScore';

import {
  yearFromDate,
  renderDate,
  gameScoreById,
  expectationById,
  cleanCountries,
} from '../utils';

import './BacklogItem.css';

const renderExpectationRating = (expectationItem) => (
  <span className={`badge badge-pill ${expectationItem.badgeStyle}`}>
    {expectationItem.label}
  </span>
);

const renderScore = (score) => (
  <span className={`badge badge-pill ${score.badgeStyle}`}>{score.label}</span>
);

export const BacklogItem = (props) => {
  const { entry } = props;

  const scoreItem = gameScoreById(entry.score);
  const expectationItem = expectationById(entry.expectation_rating);

  return (
    <li className="BacklogItem">
      <div className="BacklogItem-poster">
        <Link to={`/games/${entry.game_id}/show`}>
          <Poster url={entry.poster_thumb_url} />
        </Link>
      </div>
      <div className="BacklogItem-main">
        <p className="BacklogItem-name">
          <Link to={`/games/${entry.game_id}/show`}>{entry.game_name}</Link>
          <small>{yearFromDate(entry.game_release_date)}</small>
        </p>
        <p className="BacklogItem-user-info text-secondary">
          {['wishlist', 'backlog'].includes(entry.status) && (
            <>
              {entry.owned_platform_name}
              {entry.expectation_rating && (
                <>&nbsp;·&nbsp; {renderExpectationRating(expectationItem)}</>
              )}
            </>
          )}
          {entry.status === 'beaten' && (
            <>
              {entry.score && renderScore(scoreItem)} &nbsp;·&nbsp;{' '}
              {entry.finished_at && (
                <span className="BacklogItem-finished-at">
                  {renderDate(entry.finished_at)}
                </span>
              )}
            </>
          )}
        </p>
        <p className="BacklogItem-game-info">
          {!!entry.playthrough_time && entry.playthrough_time.main && (
            <PlaythroughTimeInfo playthroughTime={entry.playthrough_time} />
          )}
          {!!entry.playthrough_time &&
            entry.playthrough_time.main &&
            ((!!entry.rating && entry.rating.score) ||
              cleanCountries(entry.countries)) && <>&nbsp;·&nbsp;</>}
          {!!entry.rating && entry.rating.score && (
            <OpencriticScore score={entry.rating.score} />
          )}
          {cleanCountries(entry.countries).map((country) => (
            <Flag key={country} country={country} />
          ))}
        </p>
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

    score: PropTypes.number,
    expectation_rating: PropTypes.number,
    owned_platform_name: PropTypes.string,
    finished_at: PropTypes.string,
    countries: PropTypes.arrayOf(PropTypes.string),

    available_platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    playthrough_time: PropTypes.shape(),
    rating: PropTypes.shape(),
  }).isRequired,
};

export default BacklogItem;
