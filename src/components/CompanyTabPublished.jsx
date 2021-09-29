import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import ReactPlaceholder from 'react-placeholder';

import { COMPANY_PUBLISHED_FETCH_REQUESTED } from '../store/companyPage';
import GameListItem from './GameListItem';
import OffsetPagination from './OffsetPagination';
import { queryStringToFilters, filtersToQueryString } from '../utils';
import history from '../store/history';

const URL_FILTERS = ['offset'];

export const CompanyTabPublished = (props) => {
  const company = props.company;
  const { publishedFetching, published } = useSelector(
    (state) => state.companyPage
  );
  const filters = {
    ...{ offset: 0 },
    ...queryStringToFilters(props.location.search, URL_FILTERS),
    ...{ companyId: company.id },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      ...{ type: COMPANY_PUBLISHED_FETCH_REQUESTED },
      ...filters,
    });
  }, [dispatch, company.id, filters.offset]);

  return (
    <ReactPlaceholder
      showLoadingAnimation
      color="#ddd"
      ready={!publishedFetching}
      type="text"
      rows={20}
    >
      {published.length == 0 && (
        <span className="text-secondary">No games found</span>
      )}
      <div className="row">
        <div className="col-12 GameList">
          {published.map((game) => (
            <GameListItem key={game.id} game={game} />
          ))}
        </div>
      </div>
      <OffsetPagination
        offset={parseInt(filters.offset)}
        resultsCount={published.length}
        onOffsetChange={(offset) =>
          history.push(
            `/companies/${company.id}/published?${filtersToQueryString(
              { offset },
              URL_FILTERS
            )}`
          )
        }
      />
    </ReactPlaceholder>
  );
};

CompanyTabPublished.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default CompanyTabPublished;
