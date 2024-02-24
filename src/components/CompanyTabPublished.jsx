import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { COMPANY_PUBLISHED_FETCH_REQUESTED } from '../store/companyPage';
import GameListItem from './GameListItem';
import OffsetPagination from './OffsetPagination';
import { queryStringToFilters, filtersToQueryString } from '../utils';
import Loading from './Loading';

const URL_FILTERS = ['offset'];

export const CompanyTabPublished = (props) => {
  const history = useHistory();
  const company = props.company;
  const location = useLocation();
  const { publishedFetching, published } = useSelector(
    (state) => state.companyPage
  );
  const filters = {
    ...{ offset: 0 },
    ...queryStringToFilters(location.search, URL_FILTERS),
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
    <div>
      {!publishedFetching && (
        <div>
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
        </div>
      )}
      <Loading visible={publishedFetching} />
    </div>
  );
};

CompanyTabPublished.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default CompanyTabPublished;
