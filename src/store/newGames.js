import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import handle from '../api/errors';

const initialState = {
  data: [],
  fetching: false,
};

export const FETCH_NEW_GAMES_REQUESTED = 'FETCH_NEW_GAMES_REQUESTED';
export const FETCH_NEW_GAMES_STARTED = 'FETCH_NEW_GAMES_STARTED';
export const FETCH_NEW_GAMES_FINISHED = 'FETCH_NEW_GAMES_FINISHED';
export const FETCH_NEW_GAMES_ERRORED = 'FETCH_NEW_GAMES_ERRORED';

function* fetchNewGames() {
  yield put({ type: FETCH_NEW_GAMES_STARTED });
  try {
    const response = yield call(Api.fetchNewGames);
    yield put({
      type: FETCH_NEW_GAMES_FINISHED,
      data: response.data,
    });
  } catch (error) {
    yield put({ type: FETCH_NEW_GAMES_ERRORED });
    handle(error);
  }
}

export function* newGamesWatch() {
  yield takeLatest(FETCH_NEW_GAMES_REQUESTED, fetchNewGames);
}

export const newGamesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_NEW_GAMES_STARTED:
      return { ...state, data: [], fetching: true };
    case FETCH_NEW_GAMES_FINISHED:
      return { ...state, data: action.data, fetching: false };
    case FETCH_NEW_GAMES_ERRORED:
      return { ...state, data: [], fetching: false };
    default:
      return state;
  }
};

export default newGamesReducer;
