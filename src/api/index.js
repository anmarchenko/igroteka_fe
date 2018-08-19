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
  fetchOwnedPlatforms(userId, status) {
    return axios.get(
      `${SKARO_HOST}/api/available_platforms/owned?user_id=${userId}&status=${status}`,
    );
  },
  fetchAvailablePlatforms(userId, status) {
    return axios.get(`${SKARO_HOST}/api/available_platforms?user_id=${userId}&status=${status}`);
  },
  fetchBacklogEntries(filters = {}) {
    // remove nulls and join query
    const queryString = [
      filters.page ? `filter[page]=${filters.page}` : null,
      filters.userId ? `user_id=${filters.userId}` : null,
      filters.status ? `filter[status]=${filters.status}` : null,
      filters.pageSize ? `filter[page_size]=${filters.pageSize}` : null,
      filters.sort ? `filter[sort]=${filters.sort}` : null,
      filters.ownedPlatformId ? `filter[owned_platform_id]=${filters.ownedPlatformId}` : null,
      filters.availablePlatformId
        ? `filter[available_platform_id]=${filters.availablePlatformId}`
        : null,
    ]
      .filter(q => q)
      .join('&');
    return axios.get(`${SKARO_HOST}/api/backlog_entries?${queryString}`);
  },
};

export default Api;
