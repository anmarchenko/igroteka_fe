import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loginReducer, loginWatch } from './login';
import { myBacklogReducer, myBacklogWatch } from './myBacklog';
import { notificationsReducer } from './notifications';
import { searchReducer, searchWatch } from './search';

const reducers = combineReducers({
  notifications: notificationsReducer,
  session: loginReducer,
  myBacklog: myBacklogReducer,
  search: searchReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(loginWatch);
sagaMiddleware.run(myBacklogWatch);
sagaMiddleware.run(searchWatch);

export default store;
