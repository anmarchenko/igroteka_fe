import React from 'react';
import PropTypes from 'prop-types';

import { IMPORTANT_PLATFORMS } from '../../constants';

import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export const Platform = ({ platforms, platformId, platformName, onChange }) => {
  if (!platforms || platforms.length === 0) {
    return <span />;
  }

  const platformIds = platforms.map((pl) => pl.id);
  const additionalPlatforms = IMPORTANT_PLATFORMS.filter(
    (i_pl) => !platformIds.includes(i_pl.id)
  );

  return (
    <div className="form-group">
      <UncontrolledButtonDropdown>
        {!platformId && <DropdownToggle caret>Platfrom</DropdownToggle>}
        {platformId && <DropdownToggle caret>{platformName}</DropdownToggle>}
        <DropdownMenu>
          {platforms.map((platform) => (
            <DropdownItem
              key={platform.id}
              onClick={() => onChange(platform.id, platform.name)}
            >
              {platform.name}
            </DropdownItem>
          ))}
          {additionalPlatforms.map((platform) => (
            <DropdownItem
              key={platform.id}
              onClick={() => onChange(platform.id, platform.name)}
            >
              <i>{platform.name}</i>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

Platform.propTypes = {
  platformId: PropTypes.number,
  platformName: PropTypes.string,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),

  onChange: PropTypes.func.isRequired,
};

Platform.defaultProps = {
  platforms: [],
  platformId: undefined,
  platformName: undefined,
};

export default Platform;
