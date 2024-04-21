import React from 'react';
import { createRoot } from 'react-dom/client';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './index.css';
import App from './components/App';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('phoenixAuthToken');
  if (token) {
    config.headers.Authorization = token; // eslint-disable-line no-param-reassign
  }
  return config;
});

let container = document.getElementById('root');
let root = createRoot(container);
root.render(<App />); // eslint-disable-line react/jsx-filename-extension
