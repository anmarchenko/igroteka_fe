import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import range from 'lodash/range';

import GameListItem from './GameListItem';
import FilterSelect from './forms/FilterSelect';

import { FETCH_TOP_GAMES_REQUESTED } from '../store/topGames';
import { queryStringToFilters, filtersToQueryString } from '../utils';

import './TopGames.css';
import { Loading } from './Loading';

const FILTERS = ['year', 'platform'];

const PLATFORMS = [
  { value: 167, label: 'PlayStation 5' },
  { value: 169, label: 'Xbox Series' },
  { value: 130, label: 'Nintendo Switch' },
  { value: 48, label: 'PlayStation 4' },
  { value: 6, label: 'PC' },
  { value: 49, label: 'Xbox One' },
  { value: 39, label: 'iOS' },
  { value: 34, label: 'Android' },
  { value: 162, label: 'Oculus VR' },
  { value: 165, label: 'PlayStation VR' },
  { value: 9, label: 'PlayStation 3' },
  { value: 12, label: 'Xbox 360' },
  { value: 41, label: 'Wii U' },
  { value: 5, label: 'Wii' },
  { value: 37, label: 'Nintendo 3DS' },
  { value: 46, label: 'PlayStation Vita' },
];

const applyFilters = (history, newFilters) => {
  history.push(`/top?${filtersToQueryString(newFilters, FILTERS)}`);
};

export const TopGames = () => {
  const history = useHistory();
  const location = useLocation();
  const { games, fetching } = useSelector((state) => ({
    games: state.topGames.data,
    fetching: state.topGames.fetching,
  }));

  const dispatch = useDispatch();

  const filters = queryStringToFilters(location.search, FILTERS);

  useEffect(
    () => {
      dispatch({ type: FETCH_TOP_GAMES_REQUESTED, filters });
    },
    // eslint-disable-next-line
    FILTERS.map((filter) => filters[filter])
  );

  const currentYear = new Date().getFullYear();
  return (
    <div className="TopGames container">
      <Helmet>
        <title>Top games | Igroteka</title>
      </Helmet>
      <h4>Top games from IGDB</h4>
      <div className="row">
        <div className="col-12 TopGames-filters">
          <FilterSelect
            label="Year"
            clearFilterLabel="All years"
            options={range(2004, currentYear + 1)
              .reverse()
              .map((year) => ({
                value: year.toString(),
                label: year.toString(),
              }))}
            selectedValue={filters.year}
            onChange={(value) => {
              applyFilters(history, {
                ...filters,
                ...{
                  year: value,
                },
              });
            }}
          />
          <FilterSelect
            label="Platform"
            clearFilterLabel="All platforms"
            options={PLATFORMS}
            selectedValue={filters.platform}
            onChange={(value) => {
              applyFilters(history, {
                ...filters,
                ...{
                  platform: value,
                },
              });
            }}
          />
        </div>
      </div>
      {!fetching && (
        <div className="row">
          <div className="col-12 GameList">
            {games.map((game, index) => (
              <GameListItem
                key={game.id}
                game={game}
                linked
                numbered
                index={index + 1}
              />
            ))}
          </div>
        </div>
      )}
      <Loading visible={fetching} />
    </div>
  );
};

export default TopGames;
