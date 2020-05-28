import React from 'react';
import PropTypes from 'prop-types';

import Poster from './Poster';
import CriticsRating from './CriticsRating';

import { yearFromDate, renderDate } from '../utils';

import './GameListItem.css';

const platformNames = (platforms) => platforms.map((platform) => platform.name).join(', ');

const renderName = (name, numbered, index) => {
  if (numbered) {
    return `${index}. ${name}`;
  }
  return name;
};

/* eslint-disable camelcase */
export const GameListItem = ({
  game: {
    id, poster, name, release_date, short_description, platforms, rating, ratings_count,
  },
  linked,
  numbered,
  index,
  longDate,
}) => (
  <div className="GameListItem">
    <div className="game-image">
      <Poster url={poster.thumb_url} />
    </div>
    <div className="game-info">
      <div className="game-header">
        <div className="game-name">
          {linked && <a href={`/games/${id}/show`}>{renderName(name, numbered, index)}</a>}
          {!linked && name}
          <small>{longDate ? renderDate(release_date) : yearFromDate(release_date)}</small>
        </div>
        <CriticsRating rating={rating} ratings_count={ratings_count} />
      </div>
      <div className="game-description">{short_description}</div>
      <div className="game-platforms">{platformNames(platforms)}</div>
    </div>
  </div>
);

GameListItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    short_description: PropTypes.string,
    release_date: PropTypes.string,
    rating: PropTypes.number,
    ratings_count: PropTypes.number,
    poster: PropTypes.shape({
      thumb_url: PropTypes.string,
    }),
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
  linked: PropTypes.bool,
  numbered: PropTypes.bool,
  longDate: PropTypes.bool,
  index: PropTypes.number,
};

GameListItem.defaultProps = {
  game: {
    short_description: '',
    release_date: '',
    poster: {},
    platforms: [],
    rating: null,
    ratings_count: null,
  },
  linked: false,
  numbered: false,
  longDate: false,
  index: null,
};

export default GameListItem;

/* eslint-enable camelcase */
