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
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:42.0) Gecko/20100101 Firefox/42.0', //eslint-disable-line
  },
});

function login(userName, password) {
  const headers = { Referer: 'https://movielens.org/login' };
  return api
    .post('sessions', { userName, password }, headers)
    .then(response => response.headers['set-cookie'][0]);
}

function get(cookie, resource, params) {
  const headers = { cookie };
  return api.get(resource, {
    headers,
    params,
  }).then(response => response.data);
}

function post(cookie, resource, data) {
  const headers = { cookie };
  return api.post(resource, {
    headers,
    data,
  }).then(response => response.data);
}

function del(cookie, resource) {
  const headers = { cookie };
  return api.del(resource, {
    headers,
  }).then(response => response.data);
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

function topPicks(cookie, params) {
  const newParams = {
    ...params,
    hasRated: 'no',
    sortBy: 'prediction',
  };
  return explore(cookie, newParams);
}

function recentReleases(cookie, params) {
  const newParams = {
    sortBy: 'releaseDate',
    ...params,
    hasRated: 'no',
    maxDaysAgo: 90,
    maxFutureDays: 0,
  };
  return explore(cookie, newParams);
}

function favoritesYear(cookie, params) {
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

function newAdditions(cookie, params) {
  const newParams = {
    sortBy: 'dateAdded',
    ...params,
  };
  return explore(cookie, newParams);
}

function getMyRatings(cookie, params) {
  const newParams = {
    sortBy: 'userRatedDate',
    ...params,
    hasRated: 'yes',
  };
  return explore(cookie, newParams);
}

function getMyWishlist(cookie, params) {
  const newParams = {
    sortBy: 'userListedDate',
    ...params,
    hasWishlisted: 'yes',
  };
  return explore(cookie, newParams);
}

function getMyHiddenMovies(cookie, params) {
  const newParams = {
    ...params,
    hasHidden: 'yes',
  };
  return explore(cookie, newParams);
}

function getMyStats(cookie) {
  return get(cookie, 'users/me/ratings/stats');
}

function rate(cookie, movieId, rating) {
  return post(cookie, 'users/me/ratings', {
    movieId,
    rating,
  });
}

function addToWishlist(cookie, movieId) {
  return post(cookie, 'users/me/wishlist', {
    movieId,
  });
}

function removeFromWishlist(cookie, movieId) {
  return del(cookie, `users/me/wishlist/${movieId}`);
}

function hide(cookie, movieId) {
  return rate(cookie, movieId, -1);
}

function unhide(cookie, movieId) {
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
