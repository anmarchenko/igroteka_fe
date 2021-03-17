import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import { Helmet } from 'react-helmet';

import BacklogNav from './BacklogNav';
import BacklogList from './BacklogList';
import BacklogFilters from './backlog/BacklogFilters';

import {
  backlogStatusById,
  queryStringToFilters,
  filtersToQueryString,
} from '../utils';

import history from '../store/history';

import { BACKLOG_ENTRIES_FETCHING_REQUESTED } from '../store/myBacklog';

import './Backlog.css';

const ALL_FILTERS = [
  'status',
  'page',
  'pageSize',
  'sort',
  'ownedPlatformId',
  'releaseYear',
];

const URL_FILTERS = ['page', 'sort', 'ownedPlatformId', 'releaseYear'];

const DEFAULTS = {
  page: 1,
  pageSize: 50,
};

const filtersChanged = (prev, next) =>
  ALL_FILTERS.some((k) => prev[k] !== next[k]);

export class Backlog extends Component {
  constructor(props) {
    super(props);

    this.paginate = this.paginate.bind(this);
    this.load = this.load.bind(this);

    this.state = {
      shownFilters: false,
    };
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
      `/collections/${filters.status}?${filtersToQueryString(
        {
          ...filters,
          ...newFilters,
        },
        URL_FILTERS
      )}`
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
      fetching,
      filterOptions,
      entries,
      totalPages,
      totalCount,
      filters,
    } = this.props;

    const { status, page } = filters;
    const { shownFilters } = this.state;

    const ready = !fetching;
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
              <p className="text-secondary">
                <span className="d-xs-block d-sm-none">
                  {selectedStatus.label}&nbsp;·&nbsp;
                </span>
                {totalCount != null && <>{totalCount}&nbsp;games</>}
                &nbsp;·&nbsp;
                <a
                  href="#"
                  onClick={() => this.setState({ shownFilters: !shownFilters })}
                  className="Backlog-filters-switch"
                >
                  {shownFilters ? 'Hide' : 'Show'} filters
                </a>
              </p>
            </div>
          </div>
          {this.state.shownFilters && (
            <div className="row">
              <BacklogFilters
                filters={filters}
                filterOptions={filterOptions}
                applyFilters={this.applyFilters.bind(this)}
              />
            </div>
          )}

          <ReactPlaceholder
            showLoadingAnimation
            color="#ddd"
            ready={ready}
            type="text"
            rows={5}
          >
            <BacklogList
              entries={entries}
              page={parseInt(page, 10)}
              totalPages={totalPages}
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
    ...queryStringToFilters(ownProps.location.search, URL_FILTERS),
    ...{ status: ownProps.match.params.status },
  },
  filterOptions: myBacklog.filterOptions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEntries: (filters) =>
    dispatch({ type: BACKLOG_ENTRIES_FETCHING_REQUESTED, filters }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backlog);
