import React from 'react';
import PropTypes from 'prop-types';

import { scoreColor } from '../utils';

import './CircularProgress.css';

const CircularProgress = ({ score, label }) => (
  <div className="CircularProgress">
    <svg
      viewBox="0 0 75 75"
      height="75"
      width="75"
      version="1.1"
      className="CircularProgress-svg"
    >
      <circle
        strokeWidth="3"
        cx="50%"
        cy="50%"
        r="36"
        fill="none"
        stroke="#ECEFF1"
      ></circle>
      <circle
        strokeWidth="3"
        cx="50%"
        cy="50%"
        r="36"
        fill="none"
        stroke={scoreColor(score)}
        strokeDasharray="226.1946710584651, 226.1946710584651"
        strokeDashoffset={((100 - score) * 226.1946710584651) / 100}
      ></circle>
    </svg>
    <div className="CircularProgress-label">{label}</div>
  </div>
);

CircularProgress.propTypes = {
  score: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default CircularProgress;
