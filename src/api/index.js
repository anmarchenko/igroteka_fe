import axios from 'axios';

const SKARO_HOST = 'https://skaro.hmstr.rocks';

const Api = {
  currentUser() {
    return axios.get(`${SKARO_HOST}/api/current_user`);
  },
  login(email, password) {
    const data = { session: { email, password } };
    return axios.post(`${SKARO_HOST}/api/sessions`, data);
  },
  logout() {
    return axios.delete(`${SKARO_HOST}/api/sessions`);
  },
  fetchOwnedPlatforms(status) {
    return axios.get(`${SKARO_HOST}/api/available_platforms/owned?status=${status}`);
  },
  fetchAvailablePlatforms(status) {
    return axios.get(`${SKARO_HOST}/api/available_platforms?status=${status}`);
  },
  fetchBacklogEntries(filters = {}) {
    // remove nulls and join query
    const queryString = [
      filters.page ? `filters[page]=${filters.page}` : null,
      filters.pageSize ? `filters[page_size]=${filters.pageSize}` : 50,
      filters.status ? `filters[status]=${filters.status}` : null,
      filters.sort ? `filters[sort]=${filters.sort}` : null,
      filters.ownedPlatformId ? `filters[owned_platform_id]=${filters.ownedPlatformId}` : null,
      filters.availablePlatformId
        ? `filters[available_platform_id]=${filters.availablePlatformId}`
        : null,
    ]
      .filter(q => q)
      .join('&');
    return axios.get(`${SKARO_HOST}/api/backlog_entries?${queryString}`);
  },
  search(term) {
    return axios.get(`${SKARO_HOST}/api/games?term=${encodeURIComponent(term)}`);
  },
};

export default Api;
