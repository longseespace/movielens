const axios = require('axios');

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
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:42.0) Gecko/20100101 Firefox/42.0', //eslint-disable-line
  },
});

export function login(userName, password) {
  const headers = { Referer: 'https://movielens.org/login' };
  return api
    .post('sessions', { userName, password }, headers)
    .then(response => response.headers['set-cookie'][0]);
}

export function get(cookie, resource, params) {
  const headers = { cookie };
  return api.get(resource, {
    headers,
    params,
  }).then(response => response.data);
}

export function post(cookie, resource, data) {
  const headers = { cookie };
  return api.post(resource, {
    headers,
    data,
  }).then(response => response.data);
}

export function del(cookie, resource) {
  const headers = { cookie };
  return api.del(resource, {
    headers,
  }).then(response => response.data);
}

export function getMe(cookie) {
  return get(cookie, 'users/me');
}

export function getGenres(cookie) {
  return get(cookie, 'movies/genres');
}

export function getMyTags(cookie) {
  return get(cookie, 'users/me/tags');
}

export function explore(cookie, params) {
  return get(cookie, 'movies/explore', params);
}

export function topPicks(cookie, params) {
  const newParams = {
    ...params,
    hasRated: 'no',
    sortBy: 'prediction',
  };
  return explore(cookie, newParams);
}

export function recentReleases(cookie, params) {
  const newParams = {
    sortBy: 'releaseDate',
    ...params,
    hasRated: 'no',
    maxDaysAgo: 90,
    maxFutureDays: 0,
  };
  return explore(cookie, newParams);
}

export function favoritesYear(cookie, params) {
  const newParams = {
    sortBy: 'avgRating',
    ...params,
    hasRated: 'no',
    maxDaysAgo: 365,
    maxFutureDays: 0,
    minPop: 100,
  };
  return explore(cookie, newParams);
}

export function newAdditions(cookie, params) {
  const newParams = {
    sortBy: 'dateAdded',
    ...params,
  };
  return explore(cookie, newParams);
}

export function getMyRatings(cookie, params) {
  const newParams = {
    sortBy: 'userRatedDate',
    ...params,
    hasRated: 'yes',
  };
  return explore(cookie, newParams);
}

export function getMyWishlist(cookie, params) {
  const newParams = {
    sortBy: 'userListedDate',
    ...params,
    hasWishlisted: 'yes',
  };
  return explore(cookie, newParams);
}

export function getMyHiddenMovies(cookie, params) {
  const newParams = {
    ...params,
    hasHidden: 'yes',
  };
  return explore(cookie, newParams);
}

export function getMyStats(cookie) {
  return get(cookie, 'users/me/ratings/stats');
}

export function rate(cookie, movieId, rating) {
  return post(cookie, 'users/me/ratings', {
    movieId,
    rating,
  });
}

export function addToWishlist(cookie, movieId) {
  return post(cookie, 'users/me/wishlist', {
    movieId,
  });
}

export function removeFromWishlist(cookie, movieId) {
  return del(cookie, `users/me/wishlist/${movieId}`);
}

export function hide(cookie, movieId) {
  return rate(cookie, movieId, -1);
}

export function unhide(cookie, movieId) {
  return del(cookie, `users/me/ratings/${movieId}`);
}

export default {
  login,
  get,
  getMe,
  getGenres,
  getMyTags,
  explore,
  topPicks,
  recentReleases,
  favoritesYear,
  newAdditions,
  getMyRatings,
  getMyWishlist,
  getMyHiddenMovies,
  getMyStats,
  rate,
  hide,
  unhide,
  addToWishlist,
  removeFromWishlist,
};
