import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loginReducer, loginWatch } from './login';
import { myBacklogReducer, myBacklogWatch } from './myBacklog';
import { notificationsReducer } from './notifications';
import { searchReducer, searchWatch } from './search';
import { gamePageReducer, gamePageWatch } from './gamePage';
import { backlogFormReducer, backlogFormWatch } from './backlogForm';
import { profileReducer, profileWatch } from './profile';
import { screenshotsReducer, screenshotsWatch } from './screenshots';

const reducers = combineReducers({
  notifications: notificationsReducer,
  session: loginReducer,
  myBacklog: myBacklogReducer,
  search: searchReducer,
  gamePage: gamePageReducer,
  backlogForm: backlogFormReducer,
  profile: profileReducer,
  screenshots: screenshotsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(loginWatch);
sagaMiddleware.run(myBacklogWatch);
sagaMiddleware.run(searchWatch);
sagaMiddleware.run(gamePageWatch);
sagaMiddleware.run(backlogFormWatch);
sagaMiddleware.run(profileWatch);
sagaMiddleware.run(screenshotsWatch);

export default store;
