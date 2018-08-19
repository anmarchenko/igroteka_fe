import React from 'react';
import PropTypes from 'prop-types';

import {
  UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { selectImportantPlatforms, selectRestPlatforms } from '../utils';

const renderPlatforms = (platforms, onChange) => {
  if (!platforms || platforms.length === 0) {
    return null;
  }
  return platforms.map(platform => (
    <DropdownItem
      key={platform.id}
      onClick={() => onChange({
        id: platform.id,
        name: platform.name,
      })
      }
    >
      {platform.name}
    </DropdownItem>
  ));
};

export const FilterPlatform = ({ platforms, selectedPlatformName, onChange }) => {
  if (!platforms || platforms.length === 0) {
    return <span />;
  }
  return (
    <UncontrolledButtonDropdown>
      {!selectedPlatformName && (
      <DropdownToggle caret>
Select platform
      </DropdownToggle>
      )}
      {selectedPlatformName && (
      <DropdownToggle caret>
        {selectedPlatformName}
      </DropdownToggle>
      )}
      <DropdownMenu>
        {selectedPlatformName && (
          <DropdownItem onClick={() => onChange({ id: null, name: null })}>
            Clear platform
          </DropdownItem>
        )}
        {selectedPlatformName && <DropdownItem divider />}
        {renderPlatforms(selectImportantPlatforms(platforms), onChange)}
        <DropdownItem divider />
        {renderPlatforms(selectRestPlatforms(platforms), onChange)}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};

FilterPlatform.propTypes = {
  selectedPlatformName: PropTypes.string,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),

  onChange: PropTypes.func.isRequired,
};

FilterPlatform.defaultProps = {
  platforms: [],
  selectedPlatformName: undefined,
};

export default FilterPlatform;
