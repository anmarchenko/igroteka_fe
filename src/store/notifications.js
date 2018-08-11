import { OrderedSet } from 'immutable';

const initialState = {
  list: OrderedSet(),
};

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

export const notificationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        list: state.list.add({
          message: action.message,
          key: action.key,
          dismissAfter: 2000,
          action: 'Dismiss',
          onClick: (_notification, dismiss) => {
            dismiss();
          },
        }),
      };

    case DISMISS_NOTIFICATION:
      return {
        ...state,
        list: state.list.delete(action.notification),
      };

    default:
      return state;
  }
};

export default notificationsReducer;
