'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _axios2.default.create({
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
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:42.0) Gecko/20100101 Firefox/42.0' }
});

function login(userName, password) {
  var headers = { Referer: 'https://movielens.org/login' };
  return api.post('sessions', { userName: userName, password: password }, headers).then(function (response) {
    return response.headers['set-cookie'][0];
  });
}

function get(cookie, resource, params) {
  var headers = { cookie: cookie };
  return api.get(resource, {
    headers: headers,
    params: params
  }).then(function (response) {
    return response.data;
  });
}

function post(cookie, resource, data) {
  var headers = { cookie: cookie };
  return api.post(resource, {
    headers: headers,
    data: data
  }).then(function (response) {
    return response.data;
  });
}

function del(cookie, resource) {
  var headers = { cookie: cookie };
  return api.del(resource, {
    headers: headers
  }).then(function (response) {
    return response.data;
  });
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
  var newParams = _extends({}, params, {
    hasRated: 'no',
    sortBy: 'prediction'
  });
  return explore(cookie, newParams);
}

function recentReleases(cookie, params) {
  var newParams = _extends({
    sortBy: 'releaseDate'
  }, params, {
    hasRated: 'no',
    maxDaysAgo: 90,
    maxFutureDays: 0
  });
  return explore(cookie, newParams);
}

function favoritesYear(cookie, params) {
  var newParams = _extends({
    sortBy: 'avgRating'
  }, params, {
    hasRated: 'no',
    maxDaysAgo: 365,
    maxFutureDays: 0,
    minPop: 100
  });
  return explore(cookie, newParams);
}

function newAdditions(cookie, params) {
  var newParams = _extends({
    sortBy: 'dateAdded'
  }, params);
  return explore(cookie, newParams);
}

function getMyRatings(cookie, params) {
  var newParams = _extends({
    sortBy: 'userRatedDate'
  }, params, {
    hasRated: 'yes'
  });
  return explore(cookie, newParams);
}

function getMyWishlist(cookie, params) {
  var newParams = _extends({
    sortBy: 'userListedDate'
  }, params, {
    hasWishlisted: 'yes'
  });
  return explore(cookie, newParams);
}

function getMyHiddenMovies(cookie, params) {
  var newParams = _extends({}, params, {
    hasHidden: 'yes'
  });
  return explore(cookie, newParams);
}

function getMyStats(cookie) {
  return get(cookie, 'users/me/ratings/stats');
}

function rate(cookie, movieId, rating) {
  return post(cookie, 'users/me/ratings', {
    movieId: movieId,
    rating: rating
  });
}

function addToWishlist(cookie, movieId) {
  return post(cookie, 'users/me/wishlist', {
    movieId: movieId
  });
}

function removeFromWishlist(cookie, movieId) {
  return del(cookie, 'users/me/wishlist/' + movieId);
}

function hide(cookie, movieId) {
  return rate(cookie, movieId, -1);
}

function unhide(cookie, movieId) {
  return del(cookie, 'users/me/ratings/' + movieId);
}

exports.default = {
  login: login,
  get: get,
  getMe: getMe,
  getGenres: getGenres,
  getMyTags: getMyTags,
  explore: explore,
  topPicks: topPicks,
  recentReleases: recentReleases,
  favoritesYear: favoritesYear,
  newAdditions: newAdditions,
  getMyRatings: getMyRatings,
  getMyWishlist: getMyWishlist,
  getMyHiddenMovies: getMyHiddenMovies,
  getMyStats: getMyStats,
  rate: rate,
  hide: hide,
  unhide: unhide,
  addToWishlist: addToWishlist,
  removeFromWishlist: removeFromWishlist
};