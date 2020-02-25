import { call, put, takeLatest } from 'redux-saga/effects';

import handle from '../api/errors';
import Api from '../api';

const sorting = {
  wishlist: 'desc:expectation_rating',
  backlog: 'desc:expectation_rating',
  playing: 'desc:game_release_date',
  beaten: 'desc:finished_at',
};

const initialState = {
  fetching: true,

  entries: [],
  page: 1,
  totalPages: 1,
  totalCount: 0,

  ownedPlatforms: [],
};

export const BACKLOG_ENTRIES_FETCHING_REQUESTED = 'BACKLOG_ENTRIES_FETCHING_REQUESTED';

export const BACKLOG_ENTRIES_FETCHING = 'BACKLOG_ENTRIES_FETCHING';
export const BACKLOG_ENTRIES_RECEIVED = 'BACKLOG_ENTRIES_RECEIVED';

export const OWNED_PLATFORMS_REQUESTED = 'OWNED_PLATFORMS_REQUESTED';
export const OWNED_PLATFORMS_RECEIVED = 'OWNED_PLATFORMS_RECEIVED';

const paginationAction = (data) => ({
  page: data.meta.page,
  totalPages: data.meta.total_pages,
  totalCount: data.meta.total_count,
});

function* fetchOwnedPlatforms({ status }) {
  try {
    const response = yield call(Api.fetchOwnedPlatforms, status);
    yield put({
      type: OWNED_PLATFORMS_RECEIVED,
      ownedPlatforms: response.data,
    });
  } catch (error) {
    handle(error);
  }
}

function* fetchEntries({ filters }) {
  yield put({ type: BACKLOG_ENTRIES_FETCHING });
  yield put({ type: OWNED_PLATFORMS_REQUESTED, status: filters.status });

  try {
    const response = yield call(Api.fetchBacklogEntries, {
      ...filters,
      sort: sorting[filters.status],
    });
    yield put({
      type: BACKLOG_ENTRIES_RECEIVED,
      entries: response.data.data,
      ...paginationAction(response.data),
    });
  } catch (error) {
    handle(error);
  }
}

export function* myBacklogWatch() {
  yield takeLatest(OWNED_PLATFORMS_REQUESTED, fetchOwnedPlatforms);
  yield takeLatest(BACKLOG_ENTRIES_FETCHING_REQUESTED, fetchEntries);
}

const paginationReducer = (action) => ({
  page: action.page,
  totalPages: action.totalPages,
  totalCount: action.totalCount,
  hasMore: action.hasMore,
});

export const myBacklogReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case BACKLOG_ENTRIES_FETCHING:
      return { ...state, fetching: true };
    case BACKLOG_ENTRIES_RECEIVED:
      return {
        ...state,
        ...paginationReducer(action),
        entries: action.entries,
        fetching: false,
      };
    case OWNED_PLATFORMS_RECEIVED:
      return { ...state, ownedPlatforms: action.ownedPlatforms };

    default:
      return state;
  }
};

export default myBacklogReducer;
