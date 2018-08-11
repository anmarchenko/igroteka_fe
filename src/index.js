import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('phoenixAuthToken'); // eslint-disable-line no-param-reassign
  return config;
});

ReactDOM.render(<App />, document.getElementById('root')); // eslint-disable-line react/jsx-filename-extension

registerServiceWorker();
