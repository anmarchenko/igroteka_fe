import React from 'react';
import PropTypes from 'prop-types';

import Flatpickr from 'react-flatpickr';

export const DateField = ({ value, onChange, label }) => (
  <div className="form-group backlog-finished-date">
    <label htmlFor="backlog_finished_date">{label}</label>
    <br />
    <Flatpickr
      className="form-control"
      onChange={onChange}
      options={{ altInput: true, locale: { firstDayOfWeek: 1 } }}
      value={value}
      placeholder="Select date"
    />
  </div>
);

DateField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DateField.defaultProps = {
  value: undefined,
};

export default DateField;