import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { renderDate, countriesForGame } from '../utils';
import Poster from './Poster';
import Flag from './Flag';

import Form from './backlog-form/Form';
import OpencriticScore from './OpencriticScore';
import PlaythroughTimeInfo from './PlaythroughTimeInfo';
import GameTabs from './GameTabs';
import GameTabInfo from './GameTabInfo';
import GameTabMedia from './GameTabMedia';
import GameTabReviews from './GameTabReviews';

import { GAME_FETCH_REQUESTED } from '../store/gamePage';
import { FETCH_PLAYTROUGH_TIME_REQUESTED } from '../store/playthroughTime';
import { FETCH_RATING_REQUESTED } from '../store/rating';

import './GamePage.css';
import { Loading } from './Loading';

export const GamePage = () => {
  const { gameId } = useParams();

  const currentUser = useSelector((state) => state.session.currentUser);
  const { gameFetching, game } = useSelector((state) => state.gamePage);
  const playthroughTime = useSelector((state) => state.playthroughTime.data);
  const rating = useSelector((state) => state.rating.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GAME_FETCH_REQUESTED, gameId });
  }, [dispatch, gameId]);

  useEffect(() => {
    if (game.id) {
      dispatch({
        type: FETCH_PLAYTROUGH_TIME_REQUESTED,
        gameId: game.id,
        gameName: game.name,
        gameReleaseDate: game.release_date,
      });
    }
  }, [dispatch, game.name, game.id, game.release_date]);

  useEffect(() => {
    if (game.id) {
      dispatch({
        type: FETCH_RATING_REQUESTED,
        gameId: game.id,
        gameName: game.name,
        gameReleaseDate: game.release_date,
      });
    }
  }, [dispatch, game.name, game.id, game.release_date]);

  const ready = !gameFetching && !!game.name;
  const ratingPresent = rating && rating.score > 0;

  return (
    <div>
      <Helmet>
        <title>{`${game.name} | Igroteka`}</title>
      </Helmet>
      {ready && (
        <div className="container GamePage">
          <div className="GamePage-header">
            <div className="GamePage-header-poster">
              {game.poster && <Poster url={game.poster.medium_url} />}
            </div>
            <div className="GamePage-header-info">
              <div className="GamePage-game-name">{game.name}</div>
              <div className="GamePage-extended-info">
                {renderDate(game.release_date)}{' '}
                {playthroughTime.main && (
                  <>
                    &nbsp;·&nbsp;
                    <PlaythroughTimeInfo playthroughTime={playthroughTime} />
                  </>
                )}
                {ratingPresent && (
                  <>
                    &nbsp;·&nbsp;
                    <OpencriticScore score={rating.score} />
                  </>
                )}
                {game.developers && (
                  <>
                    &nbsp;·&nbsp;
                    {countriesForGame(game).map((country) => (
                      <Flag key={country} country={country} size={16} />
                    ))}
                  </>
                )}
              </div>
              {currentUser && <Form game={game} />}
            </div>
          </div>
          <GameTabs gameId={gameId} showReviews={ratingPresent} />
          <Switch>
            <Route path={`/games/${gameId}/info`}>
              <GameTabInfo game={game} playthroughTime={playthroughTime} />
            </Route>
            <Route path={`/games/${gameId}/media`}>
              <GameTabMedia game={game} />
            </Route>
            <Route path={`/games/${gameId}/reviews`}>
              <GameTabReviews rating={rating} />
            </Route>
          </Switch>
        </div>
      )}
      <Loading visible={!ready} />
    </div>
  );
};

export default GamePage;
