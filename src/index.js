import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import './index.css';
import App from './components/App';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('phoenixAuthToken');
  if (token) {
    config.headers.Authorization = token; // eslint-disable-line no-param-reassign
  }
  return config;
});

ReactDOM.render(<App />, document.getElementById('root')); // eslint-disable-line react/jsx-filename-extension

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
