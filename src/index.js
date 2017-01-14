import axios from 'axios';

const api = axios.create({
  baseURL: 'https://movielens.org/api/',
  timeout: 30000, // 30seconds
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.5',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'application/json;charset=utf-8',
    DNT: '1',
    Host: 'movielens.org',
    Pragma: 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:42.0) Gecko/20100101 Firefox/42.0', //eslint-disable-line
  },
});

async function login(userName, password) {
  const headers = { Referer: 'https://movielens.org/login' };
  const response = await api.post('sessions', { userName, password }, headers);
  return response.headers['set-cookie'][0];
}

async function get(cookie, resource, params) {
  const headers = { cookie };
  const response = await api.get(resource, {
    headers,
    params,
  });
  return response.data;
}

function getMe(cookie) {
  return get(cookie, 'users/me');
}

function getGenres(cookie) {
  return get(cookie, 'movies/genres');
}

function getMyTags(cookie) {
  return get(cookie, 'users/me/tags');
}

function explore(cookie, params) {
  return get(cookie, 'movies/explore', params);
}

export default {
  login,
  get,
  getMe,
  getGenres,
  getMyTags,
  explore,
};
