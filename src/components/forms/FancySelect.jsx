import React from 'react';
import PropTypes from 'prop-types';

import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import IconWithText from '../IconWithText';

export const valueById = (options, id) => options.find((op) => op.id === id);

export const FancySelect = ({
  options,
  value,
  onChange,
  onDelete,
  label,
  emptyLabel,
  deleteLabel,
}) => {
  const currentItem = valueById(options, value);
  return (
    <div className="mb-3 FancySelect">
      {label && (
        <>
          <label>{label}</label>
          <br />
        </>
      )}
      <UncontrolledButtonDropdown>
        {!value && (
          <DropdownToggle caret outline>
            {emptyLabel}
          </DropdownToggle>
        )}
        {value && (
          <DropdownToggle outline caret>
            <IconWithText
              Icon={currentItem.icon}
              color={currentItem.color}
              label={currentItem.label}
              size={20}
            />
          </DropdownToggle>
        )}
        <DropdownMenu>
          {options.map((item) => (
            <DropdownItem key={item.id} onClick={() => onChange(item.id)}>
              <IconWithText
                Icon={item.icon}
                color={item.color}
                label={item.label}
                size={22}
              />
            </DropdownItem>
          ))}
          {value && <DropdownItem divider />}
          {value && (
            <DropdownItem className="danger" onClick={() => onDelete()}>
              {deleteLabel}
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

FancySelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  label: PropTypes.string,
  emptyLabel: PropTypes.string.isRequired,
  deleteLabel: PropTypes.string.isRequired,
};

FancySelect.defaultProps = {
  value: null,
  label: null,
};

export default FancySelect;
