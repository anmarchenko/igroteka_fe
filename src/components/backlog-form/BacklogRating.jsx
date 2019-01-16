import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';

import Rating from '../Rating';

import './BacklogRating.css';

export const BacklogRating = ({
  label, color, value, max, onChange,
}) => (
  <div className="form-group BacklogRating">
    <label>{label}</label>
    <br />
    <Rating color={color} initialRating={value} onChange={onChange} stop={max} />
    {value && (
      <span
        className="BacklogRating-remove"
        role="button"
        tabIndex={0}
        onClick={() => onChange(null)}
      >
        <X />
      </span>
    )}
  </div>
);

BacklogRating.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number,
  max: PropTypes.number,
};

BacklogRating.defaultProps = {
  value: undefined,
  max: 5,
};

export default BacklogRating;
