import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import ReactPlaceholder from 'react-placeholder';
import {
  TextBlock,
  TextRow,
  RectShape,
} from 'react-placeholder/lib/placeholders';
import { Helmet } from 'react-helmet';

import { renderDate, countriesForGame, formatMinutes } from '../utils';
import Poster from './Poster';
import Flag from './Flag';

import Form from './backlog-form/Form';
import GamePageInfoBlock from './GamePageInfoBlock';
import CriticsRating from './CriticsRating';
import PlaythroughTimeBadge from './PlaythroughTimeBadge';
import GameTabs from './GameTabs';
import GameTabInfo from './GameTabInfo';
import GameTabMedia from './GameTabMedia';
import GameTabReviews from './GameTabReviews';

import { GAME_FETCH_REQUESTED } from '../store/gamePage';
import { FETCH_PLAYTROUGH_TIME_REQUESTED } from '../store/playthroughTime';
import { FETCH_RATING_REQUESTED } from '../store/rating';

import './GamePage.css';

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

const placeholder = (
  <div className="container GamePage">
    <div className="row GamePage-header">
      <div className="col-12 col-md-2 d-none d-sm-block">
        <RectShape
          showLoadingAnimation
          color="#ddd"
          style={{ width: 160, height: 200 }}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextRow color="#ddd" style={{ height: 35 }} />
        <TextBlock color="#ddd" rows={10} />
      </div>
      <div className="col-12 col-md-4">
        <TextBlock color="#ddd" rows={5} />
      </div>
    </div>
  </div>
);

export const GamePage = (props) => {
  const gameId = props.match.params.gameId;

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
    <ReactPlaceholder
      showLoadingAnimation
      ready={ready}
      customPlaceholder={placeholder}
    >
      <div className="container GamePage">
        <div className="row GamePage-header">
          <Helmet>
            <title>{`${game.name} | Igroteka`}</title>
          </Helmet>
          <div className="col-12 col-md-2 d-none d-sm-block">
            {game.poster && <Poster url={game.poster.medium_url} />}
          </div>
          <div className="col-12 col-md-6">
            <div className="GamePage-header-top">
              <div className="GamePage-game-name">{game.name}</div>
            </div>
            <div className="GamePage-release-date">
              {renderDate(game.release_date)}{' '}
              {game.developers &&
                countriesForGame(game).map((country) => (
                  <Flag key={country} country={country} size={24} />
                ))}
              {playthroughTime.main && (
                <PlaythroughTimeBadge
                  playthroughTime={playthroughTime}
                  useLabel={true}
                />
              )}
              {ratingPresent && (
                <CriticsRating
                  rating={rating.score}
                  ratings_count={rating.num_reviews}
                />
              )}
            </div>
            <div className="GamePage-platforms">
              {formatObjects(game.platforms)}
            </div>
            <div className="GamePage-info">
              {playthroughTime.main && (
                <GamePageInfoBlock
                  header="Time to beat"
                  text={formatPlaythroughTime(playthroughTime)}
                />
              )}
              <GamePageInfoBlock
                header="Developers"
                text={formatObjects(game.developers)}
              />
              <GamePageInfoBlock
                header="Publishers"
                text={formatObjects(game.publishers)}
              />
              <GamePageInfoBlock
                header="Franchises"
                text={formatObjects(game.franchises)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            {currentUser && <Form game={game} />}
          </div>
        </div>
        <GameTabs gameId={gameId} showReviews={ratingPresent} />
        <Switch>
          <Route
            path={`/games/${gameId}/info`}
            render={(props) => <GameTabInfo {...props} game={game} />}
          />
          <Route
            path={`/games/${gameId}/media`}
            render={(props) => <GameTabMedia {...props} game={game} />}
          />
          <Route
            path={`/games/${gameId}/reviews`}
            render={(props) => <GameTabReviews {...props} rating={rating} />}
          />
        </Switch>
      </div>
    </ReactPlaceholder>
  );
};

GamePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      gameId: PropTypes.string,
    }),
  }).isRequired,
};

export default GamePage;
