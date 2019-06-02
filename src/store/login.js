import { call, put, takeLatest } from 'redux-saga/effects';

import history from './history';
import { ADD_NOTIFICATION } from './notifications';
import handle from '../api/errors';
import Api from '../api';

const initialState = {
  currentUser: null,
  errors: {},
};

export const CURRENT_USER_REQUESTED = 'CURRENT_USER_REQUESTED';
export const CURRENT_USER_REPLACE = 'CURRENT_USER_REPLACE';
export const SIGN_IN_REQUESTED = 'SIGN_IN_REQUESTED';
export const SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const AUTH_FAILED = 'SIGN_IN_FAILED';
export const CLEAR_AUTH_ERRORS = 'CLEAR_AUTH_ERRORS';
export const SIGNED_OUT = 'SIGNED_OUT';

function* replaceCurrentUser({ user }) {
  localStorage.setItem('currentUser', JSON.stringify(user));
  yield put({
    type: SET_CURRENT_USER,
    currentUser: user,
  });
}

function* fetchCurrentUser() {
  if (localStorage.getItem('currentUser')) {
    yield put({
      type: SET_CURRENT_USER,
      currentUser: JSON.parse(localStorage.getItem('currentUser')),
    });
  }
  try {
    const response = yield call(Api.currentUser);
    yield* replaceCurrentUser({ user: response.data });
  } catch (error) {
    yield* handle(error);
  }
}

function* signIn({ email, password }) {
  try {
    const {
      data: { jwt, user },
    } = yield call(Api.login, email, password);

    localStorage.setItem('phoenixAuthToken', jwt);
    localStorage.setItem('currentUser', JSON.stringify(user));

    yield put({ type: CURRENT_USER_REQUESTED });
    yield put({
      type: ADD_NOTIFICATION,
      message: 'Successfully signed in',
      key: 'sign_in_success',
    });
    history.push('/');
  } catch (error) {
    yield* handle(error, AUTH_FAILED);
  }
}

function* signOut() {
  yield put({ type: SIGNED_OUT });
  yield put({
    type: ADD_NOTIFICATION,
    message: 'Signed out',
    key: 'sign_out_success',
  });

  localStorage.removeItem('phoenixAuthToken');
  localStorage.removeItem('currentUser');
  history.push('/');
}

export function* loginWatch() {
  yield takeLatest(CURRENT_USER_REQUESTED, fetchCurrentUser);
  yield takeLatest(CURRENT_USER_REPLACE, replaceCurrentUser);
  yield takeLatest(SIGN_IN_REQUESTED, signIn);
  yield takeLatest(SIGN_OUT_REQUESTED, signOut);
}

export const loginReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        errors: {},
      };

    case AUTH_FAILED:
      return { ...state, errors: action.errors };

    case CLEAR_AUTH_ERRORS:
      return { ...state, errors: {} };

    case SIGNED_OUT:
      return {
        ...state,
        currentUser: null,
        errors: {},
      };

    default:
      return state;
  }
};

export default loginReducer;
