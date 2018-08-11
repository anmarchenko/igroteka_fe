import { put } from 'redux-saga/effects';

import history from '../store/history';
import { ADD_NOTIFICATION } from '../store/notifications';

const genericErrorNotification = {
  type: ADD_NOTIFICATION,
  message: 'Some error has occured. Please try again later.',
  key: 'generic_error',
};

function* handle(error, formErrorAction = undefined, formErrorNotification = undefined) {
  if (!error.response) {
    yield put(genericErrorNotification);
    return;
  }

  switch (error.response.status) {
    case 403:
      localStorage.removeItem('phoenixAuthToken');
      localStorage.removeItem('currentUser');

      yield put({ type: 'SIGNED_OUT' });
      yield put({
        type: ADD_NOTIFICATION,
        message: 'Please sign in again',
        key: 'not_authorized_api',
      });
      history.push('/sign_in');
      return;
    case 422:
      if (formErrorAction) {
        yield put({
          type: formErrorAction,
          errors: error.response.data.errors,
        });
      }
      if (formErrorNotification) {
        yield put({
          type: ADD_NOTIFICATION,
          message: formErrorNotification,
          key: 'form_error_notification',
        });
      }
      return;
    default:
      yield put(genericErrorNotification);
  }
}

export default handle;
