import { call, put, takeLatest } from 'redux-saga/effects';

import handle from '../api/errors';
import Api from '../api';

const initialState = {
  backlogEntry: {},
  fetching: true,
};

export const BACKLOG_ENTRY_FETCH_REQUESTED = 'BACKLOG_ENTRY_REQUESTED';
export const BACKLOG_ENTRY_FETCH_STARTED = 'BACKLOG_ENTRY_FETCH_STARTED';
export const BACKLOG_ENTRY_FETCH_FINISHED = 'BACKLOG_ENTRY_FETCH_FINISHED';

export const BACKLOG_ENTRY_ADD = 'BACKLOG_ENTRY_ADD';
export const BACKLOG_ENTRY_UPDATE = 'BACKLOG_ENTRY_UPDATE';
export const BACKLOG_ENTRY_DELETE = 'BACKLOG_ENTRY_DELETE';

function* fetchBacklog({ gameId }) {
  yield put({ type: BACKLOG_ENTRY_FETCH_STARTED });
  try {
    const response = yield call(Api.fetchBacklogEntry, gameId);
    yield put({
      type: BACKLOG_ENTRY_FETCH_FINISHED,
      backlogEntry: response.data,
    });
  } catch (error) {
    yield put({ type: BACKLOG_ENTRY_FETCH_FINISHED, backlogEntry: {} });
  }
}

function* addToBacklog({ status, game }) {
  try {
    const response = yield call(Api.addGameToBacklog, status, game);
    yield put({
      type: BACKLOG_ENTRY_FETCH_FINISHED,
      backlogEntry: response.data,
    });
  } catch (error) {
    handle(error);
  }
}

function* updateBacklogEntry({ gameId, entryParams }) {
  try {
    const response = yield call(Api.updateBacklogEntry, gameId, entryParams);
    yield put({
      type: BACKLOG_ENTRY_FETCH_FINISHED,
      backlogEntry: response.data,
    });
  } catch (error) {
    handle(error);
  }
}

function* deleteBacklogEntry({ gameId }) {
  try {
    yield call(Api.deleteBacklogEntry, gameId);
    yield put({
      type: BACKLOG_ENTRY_FETCH_FINISHED,
      backlogEntry: {},
    });
  } catch (error) {
    handle(error);
  }
}
export function* backlogFormWatch() {
  yield takeLatest(BACKLOG_ENTRY_FETCH_REQUESTED, fetchBacklog);
  yield takeLatest(BACKLOG_ENTRY_ADD, addToBacklog);
  yield takeLatest(BACKLOG_ENTRY_UPDATE, updateBacklogEntry);
  yield takeLatest(BACKLOG_ENTRY_DELETE, deleteBacklogEntry);
}

export const backlogFormReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case BACKLOG_ENTRY_FETCH_STARTED:
      return { ...state, backlogEntry: {}, fetching: true };
    case BACKLOG_ENTRY_FETCH_FINISHED:
      return { ...state, backlogEntry: action.backlogEntry, fetching: false };
    default:
      return state;
  }
};

export default backlogFormReducer;
