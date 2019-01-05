import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import { Helmet } from 'react-helmet';

import BacklogNav from './BacklogNav';
import BacklogFilters from './BacklogFilters';
import BacklogList from './BacklogList';

import { BACKLOG_FILTERS } from '../constants';
import { backlogStatusById } from '../utils';
import history from '../store/history';

import { BACKLOG_ENTRIES_FETCHING_REQUESTED } from '../store/myBacklog';

const ALL_FILTERS = [
  'status',
  'page',
  'pageSize',
  'sort',
  'ownedPlatformId',
  'ownedPlatformName',
  'availablePlatformId',
  'availablePlatformName',
];

const URL_FILTERS = [
  'page',
  'ownedPlatformId',
  'ownedPlatformName',
  'availablePlatformId',
  'availablePlatformName',
];

const DEFAULTS = {
  page: 1,
  pageSize: 50,
  sort: 'asc:inserted_at',

  ownedPlatformId: null,
  ownedPlatformName: null,

  availablePlatformId: null,
  availablePlatformName: null,
};

const filtersChanged = (prev, next) => ALL_FILTERS.some(k => prev[k] !== next[k]);

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
    this.filterAvailablePlatform = this.filterAvailablePlatform.bind(this);
    this.filterOwnedPlatform = this.filterOwnedPlatform.bind(this);
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

  filterAvailablePlatform({ id, name }) {
    this.applyFilters({
      availablePlatformId: id,
      availablePlatformName: name,
      page: 1,
    });
  }

  filterOwnedPlatform({ id, name }) {
    this.applyFilters({
      ownedPlatformId: id,
      ownedPlatformName: name,
      page: 1,
    });
  }

  render() {
    const {
      fetching,
      availablePlatforms,
      ownedPlatforms,
      entries,
      totalPages,
      totalCount,
      filters,
    } = this.props;

    const { status, page } = filters;

    const ready = !fetching;
    const shownFilters = BACKLOG_FILTERS[status] || [];
    const selectedStatus = backlogStatusById(status) || {};

    return (
      <div className="container">
        <Helmet>
          <title>{`${selectedStatus.label} | Igroteka`}</title>
        </Helmet>
        <div className="Backlog">
          <BacklogNav />
          <div className="row">
            <div className="col-12">
              {totalCount != null && totalCount !== 0 && (
                <p className="text-secondary">
                  Showing&nbsp;
                  {totalCount}
                  &nbsp;results
                </p>
              )}
            </div>
          </div>
          <BacklogFilters
            shownFilters={shownFilters}
            filters={filters}
            availablePlatforms={availablePlatforms}
            ownedPlatforms={ownedPlatforms}
            onAvailablePlatformChanged={this.filterAvailablePlatform}
            onOwnedPlatformChanged={this.filterOwnedPlatform}
          />
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
    ownedPlatformId: PropTypes.number,
    ownedPlatformName: PropTypes.string,
    availablePlatformId: PropTypes.number,
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

  fetching: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,

  fetchEntries: PropTypes.func.isRequired,
};

Backlog.defaultProps = {
  availablePlatforms: [],
  ownedPlatforms: [],
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
  availablePlatforms: myBacklog.availablePlatforms,
  ownedPlatforms: myBacklog.ownedPlatforms,
});

const mapDispatchToProps = dispatch => ({
  fetchEntries: filters => dispatch({ type: BACKLOG_ENTRIES_FETCHING_REQUESTED, filters }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Backlog);
