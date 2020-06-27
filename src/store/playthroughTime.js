import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import handle from '../api/errors';

const initialState = {
  data: {},
  fetching: false,
};

export const FETCH_PLAYTROUGH_TIME_REQUESTED =
  'FETCH_PLAYTROUGH_TIME_REQUESTED';
export const FETCH_PLAYTROUGH_TIME_STARTED = 'FETCH_PLAYTROUGH_TIME_STARTED';
export const FETCH_PLAYTROUGH_TIME_FINISHED = 'FETCH_PLAYTROUGH_TIME_FINISHED';
export const FETCH_PLAYTROUGH_TIME_ERRORED = 'FETCH_PLAYTROUGH_TIME_ERRORED';

function* fetchPlaythroughTime({ gameId, gameName, gameReleaseDate }) {
  yield put({ type: FETCH_PLAYTROUGH_TIME_STARTED });
  try {
    const response = yield call(
      Api.fetchPlaythroughTime,
      gameId,
      gameName,
      gameReleaseDate
    );
    yield put({
      type: FETCH_PLAYTROUGH_TIME_FINISHED,
      data: response.data,
    });
  } catch (error) {
    yield put({ type: FETCH_PLAYTROUGH_TIME_ERRORED });
    handle(error);
  }
}

export function* playthroughTimeWatch() {
  yield takeLatest(FETCH_PLAYTROUGH_TIME_REQUESTED, fetchPlaythroughTime);
}

export const playthroughTimeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PLAYTROUGH_TIME_STARTED:
      return { ...state, data: {}, fetching: true };
    case FETCH_PLAYTROUGH_TIME_FINISHED:
      return { ...state, data: action.data, fetching: false };
    case FETCH_PLAYTROUGH_TIME_ERRORED:
      return { ...state, data: {}, fetching: false };
    default:
      return state;
  }
};

export default playthroughTimeReducer;
