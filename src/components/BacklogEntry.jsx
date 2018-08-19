import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import Poster from './Poster';
import { BACKLOG_TABLE_COLUMNS } from '../constants';

import './BacklogEntry.css';

const expectationRatingText = {
  1: 'Very low',
  2: 'Low',
  3: 'Medium',
  4: 'High',
  5: 'Very high',
};

const expectationRatingStyle = {
  1: 'text-secondary',
  2: 'text-secondary',
  3: '',
  4: 'text-important',
  5: 'text-important',
};

const colors = {
  10: '#1B5E20',
  9: '#388E3C',
  8: '#4CAF50',
  7: '#8BC34A',
  6: '#FFEB3B',
  5: '#FBC02D',
  4: '#F57F17',
  3: '#FF5722',
  2: '#E64A19',
  1: '#BF360C',
};

const backgroundStyleScore = (score) => {
  if (!score) return null;
  return { backgroundColor: colors[score] };
};

const renderExpectationRating = score => (
  <span className={expectationRatingStyle[score]}>
    {expectationRatingText[score]}
  </span>
);

const renderDate = (date) => {
  if (!date || date === '') {
    return 'TBD';
  }
  return dayjs(date).format('MMM, D YYYY');
};

export const BacklogEntry = (props) => {
  const { entry } = props;
  const columns = BACKLOG_TABLE_COLUMNS[entry.status] || [];
  return (
    <tr className="BacklogEntry">
      <td className="game-poster d-none d-sm-table-cell">
        <Link to={`/games/${entry.game_id}/show`}>
          <Poster url={entry.poster_thumb_url} />
        </Link>
      </td>
      <td className="game-name">
        <Link to={`/games/${entry.game_id}/show`}>
          {entry.game_name}
        </Link>
        {columns.includes('score') && (
          <div className="game-score-mobile" style={backgroundStyleScore(entry.score)}>
            {entry.score}
          </div>
        )}
        {columns.includes('note')
          && !!entry.note && (
            <div className="text-secondary">
              <b>
Note:
                {' '}
              </b>
              {entry.note}
            </div>
        )}
        {columns.includes('released') && (
          <div className="text-secondary">
            <b>
Released:
              {' '}
            </b>
            {renderDate(entry.game_release_date)}
          </div>
        )}
        {columns.includes('platform') && (
          <div className="text-secondary">
            <b>
Platform:
              {' '}
            </b>
            {entry.owned_platform_name}
          </div>
        )}
      </td>
      {columns.includes('expectationRating') && (
        <td className="game-expectation-rating">
          {entry.expectation_rating && renderExpectationRating(entry.expectation_rating)}
        </td>
      )}
      {columns.includes('finished') && (
        <td className="game-finished-date">
          {entry.finished_at && renderDate(entry.finished_at)}
        </td>
      )}
    </tr>
  );
};

BacklogEntry.propTypes = {
  entry: PropTypes.shape({
    inserted_at: PropTypes.string,

    game_id: PropTypes.number,
    game_name: PropTypes.string,
    game_release_date: PropTypes.string,
    poster_thumb_url: PropTypes.string,

    status: PropTypes.string,

    note: PropTypes.string,
    score: PropTypes.number,
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

export default BacklogEntry;
