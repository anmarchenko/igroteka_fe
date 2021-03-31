import React from 'react';
import PropTypes from 'prop-types';

import GamePageLinks from './GamePageLinks';

const GameTabInfo = ({ game }) => (
  <div className="row GamePage-extended">
    <div className="col-12">
      <h4 className="GamePage-short-description-header">Description</h4>
      <div className="GamePage-short-description text-description">
        {game.short_description || 'No description yet'}
        {game.name && <GamePageLinks game={game} />}
      </div>
    </div>
  </div>
);
GameTabInfo.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
  }),
};

export default GameTabInfo;
