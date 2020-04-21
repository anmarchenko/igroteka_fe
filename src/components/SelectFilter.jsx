import React from 'react';
import PropTypes from 'prop-types';

import {
  UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

const selectImportantOptions = (options, important) => options.filter((o) => important.includes(o.label));

const selectRestOptions = (options, important) => options.filter((o) => !important.includes(o.label));

const renderItems = (options, onChange) => {
  if (!options || options.length === 0) {
    return null;
  }
  return options.map((option) => (
    <DropdownItem key={option.value} onClick={() => onChange(option.value)}>
      {option.label}
    </DropdownItem>
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
  const selectedItem = selectedValue
    ? options.find((opt) => opt.value.toString() === selectedValue.toString())
    : null;

  const important = selectImportantOptions(options, importantOptions);
  const rest = selectRestOptions(options, importantOptions);

  return (
    <div className="filter-item">
      <div className="form-group">
        <label htmlFor="backlog_owned_platform_filter">{label}</label>
        <br />
        <UncontrolledButtonDropdown>
          {!selectedItem && <DropdownToggle caret>Select...</DropdownToggle>}
          {selectedItem && <DropdownToggle caret>{selectedItem.label}</DropdownToggle>}
          <DropdownMenu>
            {selectedItem && (
              <DropdownItem onClick={() => onChange(null)}>{clearFilterLabel}</DropdownItem>
            )}
            {selectedItem && <DropdownItem divider />}
            {renderItems(important, onChange)}
            {important.length > 0 && rest.length > 0 && <DropdownItem divider />}
            {renderItems(rest, onChange)}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
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
