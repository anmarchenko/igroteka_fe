import { call, put, takeLatest } from 'redux-saga/effects';

import handle from '../api/errors';
import Api from '../api';

const DEFAULT_SORT = {
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

  filterOptions: {
    platforms: [],
    years: [],
  },
};

export const BACKLOG_ENTRIES_FETCHING_REQUESTED = 'BACKLOG_ENTRIES_FETCHING_REQUESTED';

export const BACKLOG_ENTRIES_FETCHING = 'BACKLOG_ENTRIES_FETCHING';
export const BACKLOG_ENTRIES_RECEIVED = 'BACKLOG_ENTRIES_RECEIVED';

export const FILTERS_REQUESTED = 'FILTERS_REQUESTED';
export const FILTERS_RECEIVED = 'FILTERS_RECEIVED';

const paginationAction = (data) => ({
  page: data.meta.page,
  totalPages: data.meta.total_pages,
  totalCount: data.meta.total_count,
});

function* fetchFilters({ status }) {
  try {
    const response = yield call(Api.fetchFilters, status);
    yield put({
      type: FILTERS_RECEIVED,
      filterOptions: response.data,
    });
  } catch (error) {
    handle(error);
  }
}

function* fetchEntries({ filters }) {
  yield put({ type: BACKLOG_ENTRIES_FETCHING });
  yield put({ type: FILTERS_REQUESTED, status: filters.status });

  console.log(filters.sort);

  try {
    const response = yield call(Api.fetchBacklogEntries, {
      ...filters,
      sort: filters.sort || DEFAULT_SORT[filters.status],
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
  yield takeLatest(FILTERS_REQUESTED, fetchFilters);
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
    case FILTERS_RECEIVED:
      return { ...state, filterOptions: action.filterOptions };

    default:
      return state;
  }
};

export default myBacklogReducer;
