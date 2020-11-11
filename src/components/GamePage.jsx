import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import ReactPlaceholder from 'react-placeholder';
import {
  TextBlock,
  TextRow,
  RectShape,
} from 'react-placeholder/lib/placeholders';
import { Helmet } from 'react-helmet';
import YouTube from 'react-youtube';

import { renderDate, countriesForGame, formatMinutes } from '../utils';
import Poster from './Poster';
import Flag from './Flag';

import Form from './backlog-form/Form';
import GamePageInfoBlock from './GamePageInfoBlock';
import GamePageLinks from './GamePageLinks';
import CriticsRating from './CriticsRating';
import Screenshots from './Screenshots';
import PlaythroughTimeBadge from './PlaythroughTimeBadge';
import Reviews from './Reviews';

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
              {rating.score && rating.score > 0 && (
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
            {game.name && <GamePageLinks game={game} />}
          </div>
          <div className="col-12 col-md-4">
            {currentUser && <Form game={game} />}
          </div>
        </div>
        <div className="row GamePage-extended">
          <div className="col-12">
            <h3 className="GamePage-extended-header">Extended info</h3>
            <h4 className="GamePage-short-description-header">Description</h4>
            <div className="GamePage-short-description text-description">
              {game.short_description || 'No description yet'}
            </div>
            {rating.score && rating.score > 0 && <Reviews rating={rating} />}
            <Screenshots gameId={gameId} />
            {game.videos && (
              <>
                <h4 className="GamePage-videos-header">Videos</h4>
                {game.videos.map((video) => (
                  <div key={video.video_id} className="GamePage-video">
                    <YouTube
                      videoId={video.video_id}
                      containerClassName="GamePage-video-container"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
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
