import React from 'react';
import PropTypes from 'prop-types';

import Poster from './Poster';
import CriticsRating from './CriticsRating';

import { yearFromDate } from '../utils';

import './GameSearchItem.css';

const platformNames = (platforms) => platforms.map((platform) => platform.name).join(', ');

/* eslint-disable camelcase */
export const GameSearchItem = ({
  poster, name, release_date, short_description, platforms, rating, ratings_count,
}) => (
  <div className="GameSearchItem">
    <div className="game-image">
      <Poster url={poster.thumb_url} />
    </div>
    <div className="game-info">
      <div className="game-header">
        <div className="game-name">
          {name}
          <small>{yearFromDate(release_date)}</small>
        </div>
        <CriticsRating rating={rating} ratings_count={ratings_count} />
      </div>
      <div className="game-description">{short_description}</div>
      <div className="game-platforms">{platformNames(platforms)}</div>
    </div>
  </div>
);

GameSearchItem.propTypes = {
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
};

GameSearchItem.defaultProps = {
  short_description: '',
  release_date: '',
  poster: {},
  platforms: [],
  rating: null,
  ratings_count: null,
};

export default GameSearchItem;

/* eslint-enable camelcase */
