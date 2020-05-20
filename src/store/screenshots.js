import { call, put, takeLatest } from 'redux-saga/effects';

import handle from '../api/errors';
import Api from '../api';

const initialState = {
  data: [],
  fetching: false,
};

export const SCREENSHOTS_FETCH_REQUESTED = 'SCREENSHOTS_FETCH_REQUESTED';
export const SCREENSHOTS_FETCH_STARTED = 'SCREENSHOTS_FETCH_STARTED';
export const SCREENSHOTS_FETCH_FINISHED = 'SCREENSHOTS_FETCH_FINISHED';
export const SCREENSHOTS_FETCH_ERRORED = 'SCREENSHOTS_FETCH_ERRORED';

function* fetchScreenshots({ gameId }) {
  yield put({ type: SCREENSHOTS_FETCH_STARTED });
  try {
    const response = yield call(Api.fetchScreenshots, gameId);
    yield put({
      type: SCREENSHOTS_FETCH_FINISHED,
      data: response.data,
    });
  } catch (error) {
    yield put({ type: SCREENSHOTS_FETCH_ERRORED });
    handle(error);
  }
}

export function* screenshotsWatch() {
  yield takeLatest(SCREENSHOTS_FETCH_REQUESTED, fetchScreenshots);
}

export const screenshotsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SCREENSHOTS_FETCH_STARTED:
      return { ...state, data: [], fetching: true };
    case SCREENSHOTS_FETCH_FINISHED:
      return { ...state, data: action.data, fetching: false };
    case SCREENSHOTS_FETCH_ERRORED:
      return { ...state, data: [], fetching: false };
    default:
      return state;
  }
};

export default screenshotsReducer;
