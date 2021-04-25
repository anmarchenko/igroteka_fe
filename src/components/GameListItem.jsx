import React from 'react';
import PropTypes from 'prop-types';

import Poster from './Poster';
import BacklogStatusLabel from './BacklogStatusLabel';
import { yearFromDate, backlogStatusById } from '../utils';

import './GameListItem.css';

const renderName = (name, numbered, index) => {
  if (numbered) {
    return `${index}. ${name}`;
  }
  return name;
};

/* eslint-disable camelcase */
export const GameListItem = ({
  game: { id, poster, name, release_date, developers, backlog_entries },
  numbered,
  index,
}) => (
  <div className="GameListItem">
    <div className="game-image">
      <Poster url={poster.thumb_url} />
    </div>
    <div className="game-info">
      <p className="game-name">
        <a href={`/games/${id}/info`}>{renderName(name, numbered, index)}</a>
        <small>{yearFromDate(release_date)}</small>
      </p>
      {developers && developers.length > 0 && (
        <p className="game-developed-by text-secondary">
          by {developers[0].name}
        </p>
      )}
      {backlog_entries && backlog_entries.length > 0 && (
        <p className="GameListItem-game-info">
          <BacklogStatusLabel
            status={backlogStatusById(backlog_entries[0].status)}
            size={16}
          />
        </p>
      )}
    </div>
  </div>
);

GameListItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    poster: PropTypes.shape({
      thumb_url: PropTypes.string,
    }),
    developers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    backlog_entries: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string,
      })
    ),
  }),
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
  numbered: false,
  longDate: false,
  index: null,
};

export default GameListItem;

/* eslint-enable camelcase */
