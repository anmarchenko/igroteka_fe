import { call, put, takeLatest } from 'redux-saga/effects';

import handle from '../api/errors';
import Api from '../api';

const initialState = {
  company: {},
  companyFetching: false,

  developed: [],
  developedFetching: false,

  published: [],
  publishedFetching: false,
};

export const COMPANY_FETCH_REQUESTED = 'COMPANY_FETCH_REQUESTED';
export const COMPANY_FETCH_STARTED = 'COMPANY_FETCH_STARTED';
export const COMPANY_FETCH_FINISHED = 'COMPANY_FETCH_FINISHED';
export const COMPANY_FETCH_ERRORED = 'COMPANY_FETCH_ERRORED';

export const COMPANY_DEVELOPED_FETCH_REQUESTED =
  'COMPANY_DEVELOPED_FETCH_REQUESTED';
export const COMPANY_DEVELOPED_FETCH_STARTED =
  'COMPANY_DEVELOPED_FETCH_STARTED';
export const COMPANY_DEVELOPED_FETCH_FINISHED =
  'COMPANY_DEVELOPED_FETCH_FINISHED';
export const COMPANY_DEVELOPED_FETCH_ERRORED =
  'COMPANY_DEVELOPED_FETCH_ERRORED';

export const COMPANY_PUBLISHED_FETCH_REQUESTED =
  'COMPANY_PUBLISHED_FETCH_REQUESTED';
export const COMPANY_PUBLISHED_FETCH_STARTED =
  'COMPANY_PUBLISHED_FETCH_STARTED';
export const COMPANY_PUBLISHED_FETCH_FINISHED =
  'COMPANY_PUBLISHED_FETCH_FINISHED';
export const COMPANY_PUBLISHED_FETCH_ERRORED =
  'COMPANY_PUBLISHED_FETCH_ERRORED';

function* fetchCompany({ companyId }) {
  yield put({ type: COMPANY_FETCH_STARTED });
  try {
    const response = yield call(Api.fetchCompany, companyId);
    yield put({
      type: COMPANY_FETCH_FINISHED,
      company: response.data,
    });
  } catch (error) {
    yield put({ type: COMPANY_FETCH_ERRORED });
    handle(error);
  }
}

function* fetchDeveloped({ companyId, offset }) {
  yield put({ type: COMPANY_DEVELOPED_FETCH_STARTED });
  try {
    const response = yield call(Api.fetchGames, {
      developed: companyId,
      offset,
    });
    yield put({
      type: COMPANY_DEVELOPED_FETCH_FINISHED,
      developed: response.data,
    });
  } catch (error) {
    yield put({ type: COMPANY_DEVELOPED_FETCH_ERRORED });
    handle(error);
  }
}

function* fetchPublished({ companyId, offset }) {
  yield put({ type: COMPANY_PUBLISHED_FETCH_STARTED });
  try {
    const response = yield call(Api.fetchGames, {
      published: companyId,
      offset,
    });
    yield put({
      type: COMPANY_PUBLISHED_FETCH_FINISHED,
      published: response.data,
    });
  } catch (error) {
    yield put({ type: COMPANY_PUBLISHED_FETCH_ERRORED });
    handle(error);
  }
}

export function* companyPageWatch() {
  yield takeLatest(COMPANY_FETCH_REQUESTED, fetchCompany);
  yield takeLatest(COMPANY_DEVELOPED_FETCH_REQUESTED, fetchDeveloped);
  yield takeLatest(COMPANY_PUBLISHED_FETCH_REQUESTED, fetchPublished);
}

export const companyPageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case COMPANY_FETCH_STARTED:
      return { ...state, company: {}, companyFetching: true };
    case COMPANY_FETCH_FINISHED:
      return {
        ...state,
        company: action.company,
        companyFetching: false,
        developed: [],
        published: [],
      };
    case COMPANY_FETCH_ERRORED:
      return {
        ...state,
        company: {},
        companyFetching: false,
        developed: [],
        published: [],
      };
    case COMPANY_DEVELOPED_FETCH_STARTED:
      return { ...state, developed: [], developedFetching: true };
    case COMPANY_DEVELOPED_FETCH_FINISHED:
      return {
        ...state,
        developed: action.developed,
        developedFetching: false,
      };
    case COMPANY_DEVELOPED_FETCH_ERRORED:
      return { ...state, developed: [], developedFetching: false };
    case COMPANY_PUBLISHED_FETCH_STARTED:
      return { ...state, published: [], publishedFetching: true };
    case COMPANY_PUBLISHED_FETCH_FINISHED:
      return {
        ...state,
        published: action.published,
        publishedFetching: false,
      };
    case COMPANY_PUBLISHED_FETCH_ERRORED:
      return { ...state, published: [], publishedFetching: false };
    default:
      return state;
  }
};

export default companyPageReducer;
