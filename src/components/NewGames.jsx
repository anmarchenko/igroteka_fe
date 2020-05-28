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
    [],
  );

  return (
    <div className="NewGames container">
      <Helmet>
        <title>New games | Igroteka</title>
      </Helmet>
      <h2>New and noteworthy games</h2>
      <ReactPlaceholder showLoadingAnimation color="#ddd" ready={!fetching} type="text" rows={20}>
        <div className="row">
          <div className="col-12">
            {games.map((game) => (
              <GameListItem key={game.id} game={game} linked longDate />
            ))}
          </div>
        </div>
      </ReactPlaceholder>
    </div>
  );
};

export default NewGames;
