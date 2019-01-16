import dayjs from 'dayjs';

import { IMPORTANT_PLATFORMS, BACKLOG_STATUSES } from './constants';

const sortByName = platforms => platforms.sort((left, right) => (left.name < right.name ? -1 : 1));

export const selectImportantPlatforms = platforms => sortByName(platforms.filter(pl => IMPORTANT_PLATFORMS.includes(pl.name)));

export const selectRestPlatforms = platforms => sortByName(platforms.filter(pl => !IMPORTANT_PLATFORMS.includes(pl.name)));

export const backlogStatusById = id => BACKLOG_STATUSES.find(status => status.id === id);

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

export default selectImportantPlatforms;
