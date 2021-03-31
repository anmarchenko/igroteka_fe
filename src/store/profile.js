import { call, put, takeLatest } from 'redux-saga/effects';

import { CURRENT_USER_REPLACE } from './login';
import { ADD_NOTIFICATION } from './notifications';
import history from './history';

import Api from '../api';
import handle from '../api/errors';

const initialState = {
  edit: false,
  formErrors: {},
  formPasswordErrors: {},
};

export const USER_START_EDIT = 'USER_START_EDIT';
export const USER_STOP_EDIT = 'USER_STOP_EDIT';

export const USER_SAVE_REQUESTED = 'USER_SAVE_REQUESTED';
export const USER_SAVE_ERRORED = 'USER_SAVE_ERRORED';

export const USER_CHANGE_PASSWORD_REQUESTED = 'USER_CHANGE_PASSWORD_REQUESTED';
export const USER_CHANGE_PASSWORD_FAILED = 'USER_CHANGE_PASSWORD_FAILED';
export const USER_CHANGE_PASSWORD_CLEAR_ERRORS =
  'USER_CHANGE_PASSWORD_CLEAR_ERRORS';

function* saveUser({ userId, params }) {
  try {
    const { data } = yield call(Api.updateProfile, userId, params);
    yield put({ type: USER_STOP_EDIT });
    yield put({
      type: ADD_NOTIFICATION,
      message: 'Profile updated',
      key: 'profile_update_successful',
    });
    yield put({ type: CURRENT_USER_REPLACE, user: data });
  } catch (error) {
    yield* handle(error, USER_SAVE_ERRORED);
  }
}

function* updatePassword({ userId, params }) {
  try {
    yield call(Api.updatePassword, userId, params);
    history.push(`/users/${userId}`);
    yield put({
      type: ADD_NOTIFICATION,
      message: 'Password changed',
      key: 'password_change_successful',
    });
  } catch (error) {
    yield* handle(error, USER_CHANGE_PASSWORD_FAILED);
  }
}

export function* profileWatch() {
  yield takeLatest(USER_SAVE_REQUESTED, saveUser);
  yield takeLatest(USER_CHANGE_PASSWORD_REQUESTED, updatePassword);
}

export const profileReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_SAVE_ERRORED:
      return { ...state, formErrors: action.errors };

    case USER_START_EDIT:
      return { ...state, edit: true };
    case USER_STOP_EDIT:
      return { ...state, edit: false };

    case USER_CHANGE_PASSWORD_FAILED:
      return { ...state, formPasswordErrors: action.errors };

    case USER_CHANGE_PASSWORD_CLEAR_ERRORS:
      return { ...state, formPasswordErrors: {} };

    default:
      return state;
  }
};

export default profileReducer;
