import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import handle from '../api/errors';

const initialState = {
  results: [],
  loading: false,
};

export const SEARCH_REQUESTED = 'SEARCH_REQUESTED';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_FINISHED = 'SEARCH_FINISHED';
export const SEARCH_ERRORED = 'SEARCH_ERRORED';

function* search({ term }) {
  yield put({ type: SEARCH_STARTED });
  try {
    const response = yield call(Api.search, term);
    yield put({
      type: SEARCH_FINISHED,
      results: response.data,
    });
  } catch (error) {
    yield put({ type: SEARCH_ERRORED });
    handle(error);
  }
}

export function* searchWatch() {
  yield takeLatest(SEARCH_REQUESTED, search);
}

export const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_STARTED:
      return { ...state, results: [], loading: true };
    case SEARCH_FINISHED:
      return { ...state, results: action.results, loading: false };
    case SEARCH_ERRORED:
      return { ...state, results: [], loading: false };
    default:
      return state;
  }
};

export default searchReducer;
