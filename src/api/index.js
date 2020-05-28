import axios from 'axios';
import dayjs from 'dayjs';

import { countriesForGame } from '../utils';

const SKARO_HOST = 'https://skaro.hmstr.rocks';
// const SKARO_HOST = 'http://localhost:4000';

const Api = {
  currentUser() {
    return axios.get(`${SKARO_HOST}/api/current_user`);
  },
  login(email, password) {
    const data = { session: { email, password } };
    return axios.post(`${SKARO_HOST}/api/sessions`, data);
  },
  fetchFilters(status) {
    return axios.get(`${SKARO_HOST}/api/backlog_filters?status=${status}`);
  },
  fetchBacklogEntries(filters = {}) {
    // remove nulls and join query
    const queryString = [
      filters.page ? `filters[page]=${filters.page}` : null,
      filters.pageSize ? `filters[page_size]=${filters.pageSize}` : null,
      filters.status ? `filters[status]=${filters.status}` : null,
      filters.sort ? `filters[sort]=${filters.sort}` : null,
      filters.ownedPlatformId ? `filters[owned_platform_id]=${filters.ownedPlatformId}` : null,
      filters.releaseYear ? `filters[release_year]=${filters.releaseYear}` : null,
    ]
      .filter((q) => q)
      .join('&');
    return axios.get(`${SKARO_HOST}/api/backlog_entries?${queryString}`);
  },
  search(term) {
    return axios.get(`${SKARO_HOST}/api/games?term=${encodeURIComponent(term)}`);
  },
  fetchGame(gameId) {
    return axios.get(`${SKARO_HOST}/api/games/${gameId}`);
  },
  fetchBacklogEntry(gameId) {
    return axios.get(`${SKARO_HOST}/api/backlog_entries/${gameId}`);
  },
  addGameToBacklog(status, game) {
    const releaseDate = game.release_date ? dayjs(game.release_date).format('YYYY-MM-DD') : null;
    const entryData = {
      status,

      game_id: game.id,
      game_name: game.name,
      game_release_date: releaseDate,
      poster_thumb_url: (game.poster || {}).thumb_url,
      countries: countriesForGame(game),
    };

    const platforms = game.platforms.map((platform) => ({
      platform_id: platform.id,
      platform_name: platform.name,
    }));

    return axios.post(`${SKARO_HOST}/api/backlog_entries`, { backlog_entry: entryData, platforms });
  },
  updateBacklogEntry(gameId, entryParams) {
    return axios.put(`${SKARO_HOST}/api/backlog_entries/${gameId}`, { backlog_entry: entryParams });
  },
  deleteBacklogEntry(gameId) {
    return axios.delete(`${SKARO_HOST}/api/backlog_entries/${gameId}`);
  },
  updateProfile(userId, params) {
    return axios.put(`${SKARO_HOST}/api/users/${userId}`, {
      user: params,
    });
  },
  updatePassword(userId, params) {
    return axios.put(`${SKARO_HOST}/api/users/${userId}/update_password`, {
      user: params,
    });
  },
  fetchScreenshots(gameId) {
    return axios.get(`${SKARO_HOST}/api/screenshots?game_id=${gameId}`);
  },
  fetchTopGames(filters = {}) {
    const queryString = [
      filters.year ? `year=${filters.year}` : null,
      filters.platform ? `platform=${filters.platform}` : null,
    ]
      .filter((q) => q)
      .join('&');
    return axios.get(`${SKARO_HOST}/api/games?${queryString}`);
  },
  fetchNewGames() {
    return axios.get(`${SKARO_HOST}/api/games?new=1`);
  },
};

export default Api;
