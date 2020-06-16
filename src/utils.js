import dayjs from 'dayjs';

import { BACKLOG_STATUSES, GAME_SCORES, EXPECTATIONS } from './constants';

export const backlogStatusById = (id) =>
  BACKLOG_STATUSES.find((status) => status.id === id);

export const gameScoreById = (id) =>
  GAME_SCORES.find((score) => score.id === id);

export const expectationById = (id) => EXPECTATIONS.find((ex) => ex.id === id);

export const yearFromDate = (date) => {
  if (!date || date === '') {
    return '';
  }
  return dayjs(date).format('YYYY');
};

export const renderDate = (date) => {
  if (!date || date === '') {
    return 'TBD';
  }
  return dayjs(date).format('MMM D, YYYY');
};

export const yupToFormErrors = (yupException) => {
  const errors = {};
  if (yupException.inner.length === 0) {
    errors[yupException.path] = yupException.message;
    return errors;
  }
  yupException.inner.forEach((err) => {
    if (!errors[err.path]) {
      errors[err.path] = err.message;
    }
  });
  return errors;
};

export const cleanCountries = (countries) => {
  const res = (countries || []).filter((country) => !!country);
  return [...new Set(res)];
};

export const countriesForGame = (game) =>
  cleanCountries(game.developers.map((dev) => dev.country));

export const queryStringToFilters = (queryString, whitelist) => {
  const queryParams = new URLSearchParams(queryString);

  return [...queryParams.keys()].reduce((acc, key) => {
    if (whitelist.includes(key)) {
      return Object.assign(acc, { [key]: queryParams.get(key) });
    }
    return acc;
  }, {});
};

export const filtersToQueryString = (filters, whitelist) => {
  const urlFilters = whitelist.reduce((acc, key) => {
    const value = filters[key];
    if (value !== null && value !== undefined) {
      return Object.assign(acc, { [key]: value });
    }
    return acc;
  }, {});

  return new URLSearchParams(urlFilters).toString();
};

export const formatMinutes = (minutes) => `${minutes / 60}h`;

export default backlogStatusById;
