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
};

export default Api;
