import React from 'react';
import PropTypes from 'prop-types';

import Poster from './Poster';
import BacklogStatusLabel from './BacklogStatusLabel';
import PlaythroughTimeInfo from './PlaythroughTimeInfo';
import OpencriticScore from './OpencriticScore';
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
  game: {
    id,
    poster,
    name,
    release_date,
    developers,
    backlog_entries,
    playthrough_time,
    critics_rating,
  },
  numbered,
  index,
}) => {
  const backlogEntryPresent = backlog_entries && backlog_entries.length > 0;
  const timePresent = !!playthrough_time && playthrough_time.main;
  const ratingPresent =
    !!critics_rating && critics_rating.score && critics_rating.score != -1;

  return (
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
        {(backlogEntryPresent || timePresent || ratingPresent) && (
          <p className="GameListItem-game-info">
            {backlogEntryPresent && (
              <BacklogStatusLabel
                status={backlogStatusById(backlog_entries[0].status)}
                size={16}
              />
            )}
            {timePresent && backlogEntryPresent && <>&nbsp;·&nbsp;</>}
            {timePresent && (
              <PlaythroughTimeInfo playthroughTime={playthrough_time} />
            )}
            {(timePresent || backlogEntryPresent) && ratingPresent && (
              <>&nbsp;·&nbsp;</>
            )}
            {ratingPresent && <OpencriticScore score={critics_rating.score} />}
          </p>
        )}
      </div>
    </div>
  );
};

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
    playthrough_time: PropTypes.shape(),
    critics_rating: PropTypes.shape(),
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
