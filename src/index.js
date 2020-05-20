import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('phoenixAuthToken');
  if (token) {
    config.headers.Authorization = token; // eslint-disable-line no-param-reassign
  }
  return config;
});

ReactDOM.render(<App />, document.getElementById('root')); // eslint-disable-line react/jsx-filename-extension

registerServiceWorker();
