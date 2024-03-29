import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import BacklogList from './BacklogList';
import BacklogFilters from './backlog/BacklogFilters';

import {
  backlogStatusById,
  queryStringToFilters,
  filtersToQueryString,
} from '../utils';

import { BACKLOG_ENTRIES_FETCHING_REQUESTED } from '../store/myBacklog';

import './Backlog.css';
import { Loading } from './Loading';

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

const applyFilters = (history, filters) => (newFilters) => {
  history.push(
    `/collections/${filters.status}?${filtersToQueryString(
      {
        ...filters,
        ...newFilters,
      },
      URL_FILTERS
    )}`
  );
};

const paginate = (history, filters) => (page) => {
  applyFilters(history, filters)({ page });
};

export const Backlog = () => {
  // internal state
  const [shownFilters, setShownFilters] = useState(false);
  // router state
  const { status } = useParams();
  const location = useLocation();
  const history = useHistory();
  // redux state
  const { entries, fetching, filterOptions, totalPages, totalCount } =
    useSelector((state) => state.myBacklog);

  const filters = {
    ...DEFAULTS,
    ...queryStringToFilters(location.search, URL_FILTERS),
    ...{ status: status },
  };

  const dispatch = useDispatch();

  // fetching data
  useEffect(
    () => {
      dispatch({ type: BACKLOG_ENTRIES_FETCHING_REQUESTED, filters });
    },
    ALL_FILTERS.map((filter) => filters[filter])
  );

  const { page } = filters;

  const ready = !fetching;
  const selectedStatus = backlogStatusById(status) || {};

  return (
    <div className="container">
      <Helmet>
        <title>{`${selectedStatus.label} | Igroteka`}</title>
      </Helmet>
      <div className="Backlog">
        <div className="row">
          <div className="col-12">
            <p className="text-secondary">
              {selectedStatus.label}&nbsp;·&nbsp;
              {totalCount != null && <>{totalCount}&nbsp;games</>}
              &nbsp;·&nbsp;
              <a
                href="#"
                onClick={() => setShownFilters(!shownFilters)}
                className="Backlog-filters-switch"
              >
                {shownFilters ? 'Hide' : 'Show'} filters
              </a>
            </p>
          </div>
        </div>
        {shownFilters && (
          <div className="row">
            <BacklogFilters
              filters={filters}
              filterOptions={filterOptions}
              applyFilters={applyFilters(history, filters)}
            />
          </div>
        )}
        {ready && (
          <BacklogList
            entries={entries}
            page={parseInt(page, 10)}
            totalPages={totalPages}
            fetching={fetching}
            onPaginate={paginate(history, filters)}
          />
        )}
        <Loading visible={!ready} />
      </div>
    </div>
  );
};

export default Backlog;
