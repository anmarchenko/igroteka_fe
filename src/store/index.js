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
import { topGamesReducer, topGamesWatch } from './topGames';
import { newGamesReducer, newGamesWatch } from './newGames';
import {
  playthroughTimeReducer,
  playthroughTimeWatch,
} from './playthroughTime';
import { ratingReducer, ratingWatch } from './rating';
import { companyPageReducer, companyPageWatch } from './companyPage';

const reducers = combineReducers({
  notifications: notificationsReducer,
  session: loginReducer,
  myBacklog: myBacklogReducer,
  search: searchReducer,
  gamePage: gamePageReducer,
  backlogForm: backlogFormReducer,
  profile: profileReducer,
  screenshots: screenshotsReducer,
  topGames: topGamesReducer,
  newGames: newGamesReducer,
  playthroughTime: playthroughTimeReducer,
  rating: ratingReducer,
  companyPage: companyPageReducer,
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
sagaMiddleware.run(topGamesWatch);
sagaMiddleware.run(newGamesWatch);
sagaMiddleware.run(playthroughTimeWatch);
sagaMiddleware.run(ratingWatch);
sagaMiddleware.run(companyPageWatch);

export default store;
