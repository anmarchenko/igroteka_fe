import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import handle from '../api/errors';

const initialState = {
  data: [],
  fetching: false,
};

export const FETCH_TOP_GAMES_REQUESTED = 'FETCH_TOP_GAMES_REQUESTED';
export const FETCH_TOP_GAMES_STARTED = 'FETCH_TOP_GAMES_STARTED';
export const FETCH_TOP_GAMES_FINISHED = 'FETCH_TOP_GAMES_FINISHED';
export const FETCH_TOP_GAMES_ERRORED = 'FETCH_TOP_GAMES_ERRORED';

function* fetchTopGames({ filters }) {
  yield put({ type: FETCH_TOP_GAMES_STARTED });
  try {
    const response = yield call(Api.fetchTopGames, filters);
    yield put({
      type: FETCH_TOP_GAMES_FINISHED,
      data: response.data,
    });
  } catch (error) {
    yield put({ type: FETCH_TOP_GAMES_ERRORED });
    handle(error);
  }
}

export function* topGamesWatch() {
  yield takeLatest(FETCH_TOP_GAMES_REQUESTED, fetchTopGames);
}

export const topGamesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_TOP_GAMES_STARTED:
      return { ...state, data: [], fetching: true };
    case FETCH_TOP_GAMES_FINISHED:
      return { ...state, data: action.data, fetching: false };
    case FETCH_TOP_GAMES_ERRORED:
      return { ...state, data: [], fetching: false };
    default:
      return state;
  }
};

export default topGamesReducer;
