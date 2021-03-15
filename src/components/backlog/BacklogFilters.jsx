import React from 'react';
import PropTypes from 'prop-types';

import FilterSelect from '../forms/FilterSelect';

import { IMPORTANT_PLATFORMS, SORT_OPTIONS } from '../../constants';

export const QuickFilters = ({ filterOptions, filters, applyFilters }) => {
  const { status } = filters;

  const { platforms, years } = filterOptions;
  const sorts = SORT_OPTIONS[status];

  return (
    <div className="col-12 Backlog-filters">
      <FilterSelect
        label="Platform"
        clearFilterLabel="All"
        options={platforms.map((platform) => ({
          value: platform.id,
          label: platform.name,
        }))}
        importantOptions={IMPORTANT_PLATFORMS.map((pl) => pl.id)}
        selectedValue={filters.ownedPlatformId}
        onChange={(value) => {
          applyFilters({
            ownedPlatformId: value,
            page: 1,
          });
        }}
      />
      <FilterSelect
        label="Release&nbsp;year"
        clearFilterLabel="All"
        options={years.map((year) => ({
          value: year.toString(),
          label: year.toString(),
        }))}
        selectedValue={filters.releaseYear}
        onChange={(value) => {
          applyFilters({
            releaseYear: value,
            page: 1,
          });
        }}
      />
      <FilterSelect
        label="Sort"
        showClearFilter={false}
        options={sorts}
        selectedValue={filters.sort}
        onChange={(value) => {
          applyFilters({
            sort: value,
          });
        }}
      />
    </div>
  );
};

QuickFilters.propTypes = {
  filters: PropTypes.shape({
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.string,
    ownedPlatformId: PropTypes.string,
    releaseYear: PropTypes.string,
    sort: PropTypes.string,
  }).isRequired,

  filterOptions: PropTypes.shape({
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    years: PropTypes.arrayOf(PropTypes.number),
  }),

  applyFilters: PropTypes.func.isRequired,
};

QuickFilters.defaultProps = {
  filters: {},
  filterOptions: {
    platforms: [],
    years: [],
  },
};

export default QuickFilters;
