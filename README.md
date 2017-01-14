# movielens
Promise based Node API for the movielens unpublished API.

## Installing
Using yarn
```bash
$ yarn add movielens
```
Using npm
```bash
$ npm install --save movielens
```

## Methods

### login(email, password)
Logs you into your account and returns a Promise containing your cookie (yeah yeah I know, but that the only way movielens authorize your requests).

```javascript
var movielens = require('movielens');

movielens.login('your@email.com', 'password')
  .then(function(cookie) {
    console.log('tada', cookie);
  })
  .catch(function(err) {
    console.error(err);
  });
```

### getMe(cookie)
Gets your user information such as: Number of Ratings, Email, User Name, Preferences, and Recommender Type.

### getGenres(cookie)
Gets the list of move genres and the top(?) tags in those genres.

### getMyTags(cookie)
Gets the tags you have made.

```javascript
var movielens = require('movielens');

movielens.getMe(cookie)
  .then(function(data) {
    console.log('tada', data);
  })
  .catch(function(err) {
    console.error(err);
  });
```

### explore(cookie, params)
`explore()` is the query engine to search for movies.

```javascript
var movielens = require('movielens');

// Get movies acted by 'tom hardy' which I've rated
// 6 results found
var params = {
  actors: 'tom hardy',
  hasRated: 'yes'
}

movielens.explore(cookie, params)
  .then(function(data) {
    console.log('tada', data);
  })
  .catch(function(err) {
    console.error(err);
  });
```

For `params` references, see [node-movielens#page][1]

[1]: https://github.com/pjobson/node-movielens#page
