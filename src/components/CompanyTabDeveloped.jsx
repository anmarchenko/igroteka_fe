import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { COMPANY_DEVELOPED_FETCH_REQUESTED } from '../store/companyPage';
import GameListItem from './GameListItem';
import OffsetPagination from './OffsetPagination';
import { queryStringToFilters, filtersToQueryString } from '../utils';
import Loading from './Loading';

const URL_FILTERS = ['offset'];

export const CompanyTabDeveloped = (props) => {
  const company = props.company;
  const history = useHistory();
  const location = useLocation();
  const { developedFetching, developed } = useSelector(
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
      ...{ type: COMPANY_DEVELOPED_FETCH_REQUESTED },
      ...filters,
    });
  }, [dispatch, company.id, filters.offset]);

  return (
    <div>
      {!developedFetching && (
        <div>
          {developed.length == 0 && (
            <span className="text-secondary">No games found</span>
          )}
          <div className="row">
            <div className="col-12 GameList">
              {developed.map((game) => (
                <GameListItem key={game.id} game={game} />
              ))}
            </div>
          </div>
          <OffsetPagination
            offset={parseInt(filters.offset)}
            resultsCount={developed.length}
            onOffsetChange={(offset) =>
              history.push(
                `/companies/${company.id}/developed?${filtersToQueryString(
                  { offset },
                  URL_FILTERS
                )}`
              )
            }
          />
        </div>
      )}
      <Loading visible={developedFetching} />
    </div>
  );
};

CompanyTabDeveloped.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default CompanyTabDeveloped;
