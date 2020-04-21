import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import { Helmet } from 'react-helmet';

import BacklogNav from './BacklogNav';
import BacklogList from './BacklogList';
import SelectFilter from './SelectFilter';

import { BACKLOG_FILTERS, IMPORTANT_PLATFORMS } from '../constants';
import { backlogStatusById } from '../utils';
import history from '../store/history';

import { BACKLOG_ENTRIES_FETCHING_REQUESTED } from '../store/myBacklog';

import './Backlog.css';

const ALL_FILTERS = ['status', 'page', 'pageSize', 'sort', 'ownedPlatformId', 'releaseYear'];

const URL_FILTERS = ['page', 'sort', 'ownedPlatformId', 'releaseYear'];

const DEFAULTS = {
  page: 1,
  pageSize: 50,
  sort: 'asc:inserted_at',

  ownedPlatformId: null,

  releaseYear: null,
};

const filtersChanged = (prev, next) => ALL_FILTERS.some((k) => prev[k] !== next[k]);

const queryStringToFilters = (queryString) => {
  const queryParams = new URLSearchParams(queryString);

  return [...queryParams.keys()].reduce((acc, key) => {
    if (URL_FILTERS.includes(key)) {
      return Object.assign(acc, { [key]: queryParams.get(key) });
    }
    return acc;
  }, {});
};

const filtersToQueryString = (filters) => {
  const urlFilters = URL_FILTERS.reduce((acc, key) => {
    const value = filters[key];
    if (value !== null && value !== undefined) {
      return Object.assign(acc, { [key]: value });
    }
    return acc;
  }, {});

  return new URLSearchParams(urlFilters).toString();
};

export class Backlog extends Component {
  constructor(props) {
    super(props);

    this.paginate = this.paginate.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(nextProps) {
    const { filters } = this.props;
    if (filtersChanged(filters, nextProps.filters)) {
      this.load();
    }
  }

  applyFilters(newFilters) {
    const { filters } = this.props;
    history.push(
      `/collections/${filters.status}?${filtersToQueryString({
        ...filters,
        ...newFilters,
      })}`,
    );
  }

  load() {
    const { fetchEntries, filters } = this.props;
    fetchEntries(filters);
  }

  paginate(page) {
    this.applyFilters({ page });
  }

  render() {
    const {
      fetching, filterOptions, entries, totalPages, totalCount, filters,
    } = this.props;

    const { status, page } = filters;

    const ready = !fetching;
    const shownFilters = BACKLOG_FILTERS[status] || [];
    const selectedStatus = backlogStatusById(status) || {};

    const { platforms, years } = filterOptions;

    return (
      <div className="container">
        <Helmet>
          <title>{`${selectedStatus.label} | Igroteka`}</title>
        </Helmet>
        <div className="Backlog">
          <BacklogNav />
          <div className="row">
            <div className="col-12">
              {totalCount != null && (
                <p className="text-secondary">
                  Showing&nbsp;
                  {totalCount}
                  &nbsp;results
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 Backlog-filters">
              {shownFilters.includes('platform') && platforms && platforms.length > 0 && (
                <SelectFilter
                  label="Platform"
                  clearFilterLabel="All platforms"
                  options={platforms.map((platform) => ({
                    value: platform.id,
                    label: platform.name,
                  }))}
                  importantOptions={IMPORTANT_PLATFORMS}
                  selectedValue={filters.ownedPlatformId}
                  onChange={(value) => {
                    this.applyFilters({
                      ownedPlatformId: value,
                      page: 1,
                    });
                  }}
                />
              )}
              {shownFilters.includes('releaseYear') && years && years.length > 0 && (
                <SelectFilter
                  label="Release year"
                  clearFilterLabel="All years"
                  options={years.map((year) => ({
                    value: year,
                    label: year,
                  }))}
                  selectedValue={filters.releaseYear}
                  onChange={(value) => {
                    this.applyFilters({
                      releaseYear: value,
                      page: 1,
                    });
                  }}
                />
              )}
            </div>
          </div>
          <ReactPlaceholder showLoadingAnimation color="#ddd" ready={ready} type="text" rows={5}>
            <BacklogList
              entries={entries}
              page={parseInt(page, 10)}
              totalPages={totalPages}
              totalCount={totalCount}
              fetching={fetching}
              onPaginate={this.paginate}
            />
          </ReactPlaceholder>
        </div>
      </div>
    );
  }
}

Backlog.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  filters: PropTypes.shape({
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.string,
    ownedPlatformId: PropTypes.string,
    releaseYear: PropTypes.string,
  }).isRequired,

  filterOptions: PropTypes.shape({
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    years: PropTypes.arrayOf(PropTypes.number),
  }),

  fetching: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,

  fetchEntries: PropTypes.func.isRequired,
};

Backlog.defaultProps = {
  filterOptions: {
    platforms: [],
    years: [],
  },
};

const mapStateToProps = ({ myBacklog }, ownProps) => ({
  entries: myBacklog.entries,

  fetching: myBacklog.fetching,
  totalPages: myBacklog.totalPages,
  totalCount: myBacklog.totalCount,

  filters: {
    ...DEFAULTS,
    ...queryStringToFilters(ownProps.location.search),
    ...{ status: ownProps.match.params.status },
  },
  filterOptions: myBacklog.filterOptions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEntries: (filters) => dispatch({ type: BACKLOG_ENTRIES_FETCHING_REQUESTED, filters }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backlog);
