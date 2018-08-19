import { call, put, takeLatest } from 'redux-saga/effects';

import handle from '../api/errors';
import Api from '../api';

const sorting = {
  wishlist: 'desc:expectation_rating',
  backlog: 'desc:expectation_rating',
  playing: 'asc:inserted_at',
  beaten: 'desc:finished_at',
};

const initialState = {
  entries: [],
  fetching: true,
  page: 1,
  totalPages: 1,

  availablePlatforms: [],
  ownedPlatforms: [],

  filters: {
    userId: null,
    status: null,
    page: 1,
    pageSize: 50,
    sort: 'asc:inserted_at',

    ownedPlatformId: null,
    ownedPlatformName: null,

    availablePlatformId: null,
    availablePlatformName: null,
  },
};

export const BACKLOG_ENTRIES_FETCHING_REQUESTED = 'BACKLOG_ENTRIES_FETCHING_REQUESTED';

export const BACKLOG_ENTRIES_FETCHING = 'BACKLOG_ENTRIES_FETCHING';
export const BACKLOG_ENTRIES_RECEIVED = 'BACKLOG_ENTRIES_RECEIVED';

export const AVAILABLE_PLATFORMS_REQUESTED = 'AVAILABLE_PLATFORMS_REQUESTED';
export const AVAILABLE_PLATFORMS_RECEIVED = 'AVAILABLE_PLATFORMS_RECEIVED';

export const OWNED_PLATFORMS_REQUESTED = 'OWNED_PLATFORMS_REQUESTED';
export const OWNED_PLATFORMS_RECEIVED = 'OWNED_PLATFORMS_RECEIVED';

const paginationAction = data => ({
  page: data.page,
  totalPages: data.total_pages,
});

function* fetchAvailablePlatforms({ userId, status }) {
  try {
    const response = yield call(Api.fetchAvailablePlatforms, userId, status);
    yield put({
      type: AVAILABLE_PLATFORMS_RECEIVED,
      availablePlatforms: response.data,
    });
  } catch (error) {
    handle(error);
  }
}

function* fetchOwnedPlatforms({ userId, status }) {
  try {
    const response = yield call(Api.fetchOwnedPlatforms, userId, status);
    yield put({
      type: OWNED_PLATFORMS_RECEIVED,
      ownedPlatforms: response.data,
    });
  } catch (error) {
    handle(error);
  }
}

function* fetchEntries({ filters }) {
  yield put({ type: BACKLOG_ENTRIES_FETCHING, filters });
  yield put({
    type: AVAILABLE_PLATFORMS_REQUESTED,
    userId: filters.userId,
    status: filters.status,
  });
  yield put({ type: OWNED_PLATFORMS_REQUESTED, userId: filters.userId, status: filters.status });

  try {
    const response = yield call(Api.fetchBacklogEntries, {
      ...filters,
      sort: sorting[filters.status],
    });
    yield put({
      type: BACKLOG_ENTRIES_RECEIVED,
      entries: response.data.entries,
      ...paginationAction(response.data),
    });
  } catch (error) {
    handle(error);
  }
}

export function* myBacklogWatch() {
  yield takeLatest(AVAILABLE_PLATFORMS_REQUESTED, fetchAvailablePlatforms);
  yield takeLatest(OWNED_PLATFORMS_REQUESTED, fetchOwnedPlatforms);
  yield takeLatest(BACKLOG_ENTRIES_FETCHING_REQUESTED, fetchEntries);
}

const paginationReducer = action => ({
  page: action.page,
  totalPages: action.totalPages,
  hasMore: action.hasMore,
});

export const myBacklogReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case BACKLOG_ENTRIES_FETCHING:
      return { ...state, fetching: true, filters: action.filters };
    case BACKLOG_ENTRIES_RECEIVED:
      return {
        ...state,
        ...paginationReducer(action),
        entries: action.entries,
        fetching: false,
      };
    case AVAILABLE_PLATFORMS_RECEIVED:
      return { ...state, availablePlatforms: action.availablePlatforms };
    case OWNED_PLATFORMS_RECEIVED:
      return { ...state, ownedPlatforms: action.ownedPlatforms };

    default:
      return state;
  }
};

export default myBacklogReducer;
