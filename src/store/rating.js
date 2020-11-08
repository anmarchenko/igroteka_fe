import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import handle from '../api/errors';

const initialState = {
  data: {},
  fetching: false,
};

export const FETCH_RATING_REQUESTED = 'FETCH_RATING_REQUESTED';
export const FETCH_RATING_STARTED = 'FETCH_RATING_STARTED';
export const FETCH_RATING_FINISHED = 'FETCH_RATING_FINISHED';
export const FETCH_RATING_ERRORED = 'FETCH_RATING_ERRORED';

function* fetchRating({ gameId, gameName, gameReleaseDate }) {
  yield put({ type: FETCH_RATING_STARTED });
  try {
    const response = yield call(
      Api.fetchRating,
      gameId,
      gameName,
      gameReleaseDate
    );
    yield put({
      type: FETCH_RATING_FINISHED,
      data: response.data,
    });
  } catch (error) {
    yield put({ type: FETCH_RATING_ERRORED });
    handle(error);
  }
}

export function* ratingWatch() {
  yield takeLatest(FETCH_RATING_REQUESTED, fetchRating);
}

export const ratingReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_RATING_STARTED:
      return { ...state, data: {}, fetching: true };
    case FETCH_RATING_FINISHED:
      return { ...state, data: action.data, fetching: false };
    case FETCH_RATING_ERRORED:
      return { ...state, data: {}, fetching: false };
    default:
      return state;
  }
};

export default ratingReducer;
