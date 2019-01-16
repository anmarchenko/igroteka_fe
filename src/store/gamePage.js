import { call, put, takeLatest } from 'redux-saga/effects';

import handle from '../api/errors';
import Api from '../api';

const initialState = {
  game: {},
  gameFetching: false,
};

export const GAME_FETCH_REQUESTED = 'GAME_FETCH_REQUESTED';
export const GAME_FETCH_STARTED = 'GAME_FETCH_STARTED';
export const GAME_FETCH_FINISHED = 'GAME_FETCH_FINISHED';
export const GAME_FETCH_ERRORED = 'GAME_FETCH_ERRORED';

function* fetchGame({ gameId }) {
  yield put({ type: GAME_FETCH_STARTED });
  try {
    const response = yield call(Api.fetchGame, gameId);
    yield put({
      type: GAME_FETCH_FINISHED,
      game: response.data,
    });
  } catch (error) {
    yield put({ type: GAME_FETCH_ERRORED });
    handle(error);
  }
}

export function* gamePageWatch() {
  yield takeLatest(GAME_FETCH_REQUESTED, fetchGame);
}

export const gamePageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GAME_FETCH_STARTED:
      return { ...state, game: {}, gameFetching: true };
    case GAME_FETCH_FINISHED:
      return { ...state, game: action.game, gameFetching: false };
    case GAME_FETCH_ERRORED:
      return { ...state, game: {}, gameFetching: false };
    default:
      return state;
  }
};

export default gamePageReducer;
