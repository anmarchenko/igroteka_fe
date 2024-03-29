import React from 'react';
import PropTypes from 'prop-types';

import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export const DateField = ({ value, onChange, label }) => (
  <div className="mb-3 backlog-finished-date">
    {label && (
      <>
        <label htmlFor="backlog_finished_date">{label}</label>
        <br />
      </>
    )}
    <Flatpickr
      className="form-control"
      onChange={onChange}
      options={{
        altInput: true,
        locale: { firstDayOfWeek: 1 },
        disableMobile: true,
      }}
      value={value}
      placeholder="Finished on"
    />
  </div>
);

DateField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DateField.defaultProps = {
  value: undefined,
  label: undefined,
};

export default DateField;
