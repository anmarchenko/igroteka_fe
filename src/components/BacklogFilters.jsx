import React from 'react';
import PropTypes from 'prop-types';

import FilterPlatform from './FilterPlatform';
import './BacklogFilters.css';

const BacklogFilters = ({
  shownFilters,
  filters: { ownedPlatformName, availablePlatformName },
  availablePlatforms,
  ownedPlatforms,
  onAvailablePlatformChanged,
  onOwnedPlatformChanged,
}) => (
  <div className="row">
    <div className="col-12 BacklogFilters">
      {shownFilters.includes('available') && availablePlatforms && availablePlatforms.length > 0 && (
        <div className="BacklogFilter">
          <div className="form-group">
            <label htmlFor="backlog_available_platform_filter">Platform</label>
            <br />
            <FilterPlatform
              onChange={onAvailablePlatformChanged}
              platforms={availablePlatforms}
              selectedPlatformName={availablePlatformName}
            />
          </div>
        </div>
      )}
      {shownFilters.includes('played') && ownedPlatforms && ownedPlatforms.length > 0 && (
        <div className="BacklogFilter">
          <div className="form-group">
            <label htmlFor="backlog_owned_platform_filter">My platform</label>
            <br />
            <FilterPlatform
              onChange={onOwnedPlatformChanged}
              platforms={ownedPlatforms}
              selectedPlatformName={ownedPlatformName}
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

BacklogFilters.propTypes = {
  shownFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.shape({
    ownedPlatformName: PropTypes.string,
    availablePlatformName: PropTypes.string,
  }).isRequired,
  availablePlatforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  ownedPlatforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  onAvailablePlatformChanged: PropTypes.func.isRequired,
  onOwnedPlatformChanged: PropTypes.func.isRequired,
};

BacklogFilters.defaultProps = {
  availablePlatforms: [],
  ownedPlatforms: [],
};

export default BacklogFilters;
