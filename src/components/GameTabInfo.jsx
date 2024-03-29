import React from 'react';
import PropTypes from 'prop-types';

import GamePageLinks from './GamePageLinks';
import GamePageInfoBlock from './GamePageInfoBlock';
import CompaniesBlock from './CompaniesBlock';
import { formatMinutes } from '../utils';

const formatObjects = (objects) => {
  if (!objects) return null;
  return objects.map((obj) => obj.name).join(', ');
};

const formatPlaythroughTime = (playthroughTime) => {
  if (!playthroughTime.main) return null;
  return (
    <a href={playthroughTime.external_url} target="_blank" rel="noreferrer">
      {formatMinutes(playthroughTime.main)} /{' '}
      {formatMinutes(playthroughTime.main_extra)} /{' '}
      {formatMinutes(playthroughTime.completionist)}
    </a>
  );
};

const GameTabInfo = ({ game, playthroughTime }) => (
  <div className="row GameTabInfo">
    <div className="col-12 col-md-8">
      <h4>Description</h4>
      <div>{game.short_description || 'No description yet'}</div>
      <h4>Links</h4>
      <div> {game.name && <GamePageLinks game={game} />}</div>
    </div>
    <div className="col-12 col-md-4">
      <div className="GamePage-info">
        <h4>Details</h4>
        {playthroughTime.main && (
          <GamePageInfoBlock
            header="Time to beat"
            text={formatPlaythroughTime(playthroughTime)}
          />
        )}
        <GamePageInfoBlock
          header="Platforms"
          text={formatObjects(game.platforms)}
        />
        <CompaniesBlock
          header="Developers"
          companies={game.developers}
          suffix="developed"
        />
        <CompaniesBlock
          header="Publishers"
          companies={game.publishers}
          suffix="published"
        />
        <GamePageInfoBlock
          header="Franchises"
          text={formatObjects(game.franchises)}
        />
        <GamePageInfoBlock header="Genres" text={formatObjects(game.genres)} />
        <GamePageInfoBlock header="Themes" text={formatObjects(game.themes)} />
      </div>
    </div>
  </div>
);

GameTabInfo.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    developers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    publishers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    franchises: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
  playthroughTime: PropTypes.shape({
    main: PropTypes.number,
    main_extra: PropTypes.number,
    completionist: PropTypes.number,
    external_url: PropTypes.string,
  }),
};

export default GameTabInfo;
