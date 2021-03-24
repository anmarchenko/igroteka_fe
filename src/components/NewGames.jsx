import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import ReactPlaceholder from 'react-placeholder';

import GameListItem from './GameListItem';

import { FETCH_NEW_GAMES_REQUESTED } from '../store/newGames';

export const NewGames = () => {
  const { games, fetching } = useSelector((state) => ({
    games: state.newGames.data,
    fetching: state.newGames.fetching,
  }));

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch({ type: FETCH_NEW_GAMES_REQUESTED });
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="NewGames container">
      <Helmet>
        <title>New games | Igroteka</title>
      </Helmet>
      <h4>New and noteworthy games</h4>
      <ReactPlaceholder
        showLoadingAnimation
        color="#ddd"
        ready={!fetching}
        type="text"
        rows={20}
      >
        <div className="row">
          <div className="col-12 GameList">
            {games.map((game) => (
              <GameListItem key={game.id} game={game} />
            ))}
          </div>
        </div>
      </ReactPlaceholder>
    </div>
  );
};

export default NewGames;
