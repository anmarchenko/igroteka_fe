import React from 'react';
import PropTypes from 'prop-types';

const selectImportantOptions = (options, important) => options.filter((o) => important.includes(o.label));

const selectRestOptions = (options, important) => options.filter((o) => !important.includes(o.label));

const renderItems = (options) => {
  if (!options || options.length === 0) {
    return null;
  }
  return options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label.substring(0, 25)}
    </option>
  ));
};

export const SelectFilter = ({
  options,
  selectedValue,
  onChange,
  label,
  clearFilterLabel,
  importantOptions,
}) => {
  if (!options || options.length === 0) {
    return <span />;
  }
  const important = selectImportantOptions(options, importantOptions);
  const rest = selectRestOptions(options, importantOptions);

  return (
    <div className="filter-item">
      <div className="form-group">
        <label htmlFor="backlog_owned_platform_filter">{label}</label>
        <br />
        <select
          className="form-control"
          value={selectedValue || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{clearFilterLabel}</option>
          {renderItems(important)}
          {renderItems(rest)}
        </select>
      </div>
    </div>
  );
};

SelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
  clearFilterLabel: PropTypes.string.isRequired,

  selectedValue: PropTypes.string,
  importantOptions: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),

  onChange: PropTypes.func.isRequired,
};

SelectFilter.defaultProps = {
  options: [],
  importantOptions: [],
  selectedValue: undefined,
};

export default SelectFilter;
