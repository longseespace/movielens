'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var login = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(userName, password) {
    var headers, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            headers = { Referer: 'https://movielens.org/login' };
            _context.next = 3;
            return api.post('sessions', { userName: userName, password: password }, headers);

          case 3:
            response = _context.sent;
            return _context.abrupt('return', response.headers['set-cookie'][0]);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var get = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(cookie, resource, params) {
    var headers, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            headers = { cookie: cookie };
            _context2.next = 3;
            return api.get(resource, {
              headers: headers,
              params: params
            });

          case 3:
            response = _context2.sent;
            return _context2.abrupt('return', response.data);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function get(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

exports.default = {
  login: login,
  get: get,
  getMe: getMe,
  getGenres: getGenres,
  getMyTags: getMyTags,
  explore: explore
};