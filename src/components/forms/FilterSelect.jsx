import React from 'react';
import PropTypes from 'prop-types';

import './FilterSelect.css';

const selectImportantOptions = (options, important) => options.filter((o) => important.includes(o.label));

const selectRestOptions = (options, important) => options.filter((o) => !important.includes(o.label));

const renderItems = (options) => {
  if (!options || options.length === 0) {
    return null;
  }
  return options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
};

export const FilterSelect = ({
  options,
  selectedValue,
  onChange,
  label,
  clearFilterLabel,
  importantOptions,
  showClearFilter,
}) => {
  if (!options || options.length === 0) {
    return <span />;
  }
  const important = selectImportantOptions(options, importantOptions);
  const rest = selectRestOptions(options, importantOptions);

  return (
    <div className="FilterSelect">
      <div className="form-group">
        <label htmlFor="backlog_owned_platform_filter">{label}</label>
        <br />
        <select
          className="form-control"
          value={selectedValue || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          {showClearFilter && <option value="">{clearFilterLabel}</option>}
          {renderItems(important)}
          {renderItems(rest)}
        </select>
      </div>
    </div>
  );
};

FilterSelect.propTypes = {
  label: PropTypes.string.isRequired,

  showClearFilter: PropTypes.bool,
  clearFilterLabel: PropTypes.string,

  selectedValue: PropTypes.string,
  importantOptions: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),

  onChange: PropTypes.func.isRequired,
};

FilterSelect.defaultProps = {
  options: [],
  importantOptions: [],
  selectedValue: undefined,
  showClearFilter: true,
  clearFilterLabel: 'All',
};

export default FilterSelect;
