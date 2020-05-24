import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GameListItem from './GameListItem';
import { FETCH_TOP_GAMES_REQUESTED } from '../store/topGames';

export const TopGames = () => {
  const games = useSelector((state) => state.topGames.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_TOP_GAMES_REQUESTED });
  }, [dispatch]);

  return (
    <div className="TopGames container">
      <div className="row">
        <div className="col-12">
          {games.map((game, index) => (
            <GameListItem key={game.id} game={game} linked numbered index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopGames;
