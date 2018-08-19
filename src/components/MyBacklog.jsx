import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import { Helmet } from 'react-helmet';

import MyBacklogNav from './MyBacklogNav';
import BacklogFilters from './BacklogFilters';
import BacklogEntries from './BacklogEntries';

import { BACKLOG_FILTERS } from '../constants';
import { backlogStatusById } from '../utils';

import { BACKLOG_ENTRIES_FETCHING_REQUESTED } from '../store/myBacklog';

export class MyBacklog extends Component {
  constructor(props) {
    super(props);

    this.fetch = this.fetch.bind(this);
    this.paginate = this.paginate.bind(this);
    this.load = this.load.bind(this);
    this.filterAvailablePlatform = this.filterAvailablePlatform.bind(this);
    this.filterOwnedPlatform = this.filterOwnedPlatform.bind(this);
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.load(currentUser.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = this.props;
    if (!currentUser && nextProps.currentUser) {
      this.load(nextProps.currentUser.id);
    }
  }

  componentDidUpdate(nextProps) {
    const { status, currentUser } = this.props;
    if (nextProps.status !== status) {
      this.load(currentUser.id);
    }
  }

  fetch(newFilters) {
    const { fetchEntries, filters } = this.props;

    fetchEntries({
      ...filters,
      ...newFilters,
    });
  }

  load(userId) {
    const { status } = this.props;

    this.fetch({
      userId,
      page: 1,
      status,
      availablePlatformId: null,
      availablePlatformName: null,
      ownedPlatformId: null,
      ownedPlatformName: null,
    });
  }

  paginate(page) {
    this.fetch({ page });
  }

  filterAvailablePlatform({ id, name }) {
    this.fetch({
      availablePlatformId: id,
      availablePlatformName: name,
      page: 1,
    });
  }

  filterOwnedPlatform({ id, name }) {
    this.fetch({
      ownedPlatformId: id,
      ownedPlatformName: name,
      page: 1,
    });
  }

  render() {
    const {
      fetching,
      currentUser,
      availablePlatforms,
      ownedPlatforms,
      entries,
      page,
      totalPages,
      status,
      filters,
    } = this.props;

    const ready = !fetching && !!currentUser && !!currentUser.id;
    const shownFilters = BACKLOG_FILTERS[status] || [];
    const selectedStatus = backlogStatusById(status) || {};

    return (
      <div className="container">
        <Helmet>
          <title>
            {`${selectedStatus.label} | Igroteka`}
          </title>
        </Helmet>
        <div className="MyBacklog">
          <MyBacklogNav />
          <BacklogFilters
            shownFilters={shownFilters}
            filters={filters}
            availablePlatforms={availablePlatforms}
            ownedPlatforms={ownedPlatforms}
            onAvailablePlatformChanged={this.filterAvailablePlatform}
            onOwnedPlatformChanged={this.filterOwnedPlatform}
          />
          <ReactPlaceholder showLoadingAnimation color="#ddd" ready={ready} type="text" rows={5}>
            <BacklogEntries
              entries={entries}
              page={page}
              totalPages={totalPages}
              status={status}
              fetching={fetching}
              onPaginate={this.paginate}
            />
          </ReactPlaceholder>
        </div>
      </div>
    );
  }
}

MyBacklog.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  filters: PropTypes.shape({
    page: PropTypes.number,
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
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,

  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),

  fetchEntries: PropTypes.func.isRequired,
};

MyBacklog.defaultProps = {
  currentUser: null,
  availablePlatforms: [],
  ownedPlatforms: [],
};

const mapStateToProps = ({ session, myBacklog }, ownProps) => ({
  entries: myBacklog.entries,

  fetching: myBacklog.fetching,
  totalPages: myBacklog.totalPages,
  page: myBacklog.page,
  status: ownProps.match.params.status,

  currentUser: session.currentUser,

  filters: myBacklog.filters,
  availablePlatforms: myBacklog.availablePlatforms,
  ownedPlatforms: myBacklog.ownedPlatforms,
});

const mapDispatchToProps = dispatch => ({
  fetchEntries: filters => dispatch({ type: BACKLOG_ENTRIES_FETCHING_REQUESTED, filters }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyBacklog);
