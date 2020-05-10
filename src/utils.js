import dayjs from 'dayjs';

import { BACKLOG_STATUSES, GAME_SCORES, EXPECTATIONS } from './constants';

export const backlogStatusById = (id) => BACKLOG_STATUSES.find((status) => status.id === id);

export const gameScoreById = (id) => GAME_SCORES.find((score) => score.id === id);

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

export default backlogStatusById;
