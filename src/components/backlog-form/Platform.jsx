import React from 'react';
import PropTypes from 'prop-types';

import {
  UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

export const Platform = ({
  platforms, platformId, platformName, label, onChange,
}) => {
  if (!platforms || platforms.length === 0) {
    return <span />;
  }

  return (
    <div className="form-group">
      <label>My platform</label>
      <br />
      <UncontrolledButtonDropdown>
        {!platformId && <DropdownToggle caret>Select...</DropdownToggle>}
        {platformId && <DropdownToggle caret>{platformName}</DropdownToggle>}
        <DropdownMenu>
          {platforms.map(platform => (
            <DropdownItem key={platform.id} onClick={() => onChange(platform.id, platform.name)}>
              {platform.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

Platform.propTypes = {
  label: PropTypes.string.isRequired,
  platformId: PropTypes.number,
  platformName: PropTypes.string,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),

  onChange: PropTypes.func.isRequired,
};

Platform.defaultProps = {
  platforms: [],
  platformId: undefined,
  platformName: undefined,
};

export default Platform;
