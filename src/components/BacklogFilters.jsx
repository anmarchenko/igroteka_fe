import React from 'react';
import PropTypes from 'prop-types';

import FilterPlatform from './FilterPlatform';
import './BacklogFilters.css';

const BacklogFilters = ({
  shownFilters,
  filters: { ownedPlatformName },
  ownedPlatforms,
  onOwnedPlatformChanged,
}) => (
  <div className="row">
    <div className="col-12 BacklogFilters">
      {shownFilters.includes('platform') && ownedPlatforms && ownedPlatforms.length > 0 && (
        <div className="BacklogFilter">
          <div className="form-group">
            <label htmlFor="backlog_owned_platform_filter">Platform</label>
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
  }).isRequired,

  ownedPlatforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  onOwnedPlatformChanged: PropTypes.func.isRequired,
};

BacklogFilters.defaultProps = {
  ownedPlatforms: [],
};

export default BacklogFilters;
