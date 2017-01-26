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

### rate(cookie, movieId, rating)
Rate a movie.

```javascript
var movielens = require('movielens');

// give "The Shawshank Redemption" 5 stars
movielens.rate(cookie, 318, 5)
  .then(function(data) {
    console.log('tada', data);
  })
  .catch(function(err) {
    console.error(err);
  });
```

### hide(cookie, movieId)
Hide a movie.

### unhide(cookie, movieId)
Unhide a movie.

### addToWishlist(cookie, movieId)
Add a movie to your wishlist.

### removeFromWishlist(cookie, movieId)
Remove a movie from your wishlist.

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

`params` references:

|param|type|description|
|---|---|---|
|`page`|integer|Page result number (default: 1). A query will return a pager object you will have to make subsequent calls to pull all of the data|
|`q`|string|Movie title query|
|`directors`|string|Director Name query|
|`actors`|string|Actor Name query|
|`maxDaysAgo`|int|Maximum days ago movie was released|
|`maxFutureDays`|int|Maximum days in the future movie will be released|
|`hasRated`|enum|Include or do not include movies you've rated (one of: [yes, no, ignore], default: no)|
|`sortBy`|enum|Data sort type (one of: [userRatedDate, userRating, userRatingDiff, prediction, popularity, releaseDate, dateAdded, tagScore])|
|`sortDirection`|enum|Direction of sorted results (one of: [asc, desc], default: desc|
|`genre`|string|Filter by genre|
|`tag`|string, string[]|Filter by tag(s)|
|`mpaa`|string|Filter by MPAA rating (one of: [g, pg, pg-13, r, nc-17])|
|`minPop`|int|Mininum number of ratings|
|`maxPop`|int|Maximum number of ratings|
|`minYear`|int|Minimum year|
|`maxYear`|int|Maximum year|
|`hasHidden`|enum|Include hidden movies or not (one of: [yes, no, ignore], default: no)|
|`hasWishlisted`|enum|Include movies in your wishlist or not (one of: [yes, no, ignore], default: no)|
|`languages`|enum|Language of the movie or more specifically if the movie has been translated into one of the languages.  Despite the name you may only pass one language|

List of languages I've found, there may be more.

    Afrikaans      afrikaans
    Albanian       shqip
    Arabic         العربية
    Bambara        bamanankan
    Bengali        বাংলা
    Bosnian        босански
    Bulgarian      български език
    Catalan        català
    Croatian       hrvatski
    Czech          český
    Danish         dansk
    Dutch          nederlands
    English        english
    Estonian       eesti
    Finnish        suomi
    French         français
    Galician       galego
    Georgian       ქართული
    German         deutsch
    Greek          ελληνικά
    Hebrew         עִבְרִית
    Hindi          हिन्दी
    Hungarian      magyar
    Icelandic      íslenska
    Indonesian     bahasa indonesia
    Irish          gaeilge
    Italian        italiano
    Japanese       日本語
    Latin          latin
    Mandarin       普通话
    Norwegian      norsk
    Pashto         پښتو
    Polish         polski
    Portuguese     português
    Punjabi        ਪੰਜਾਬੀ
    Romanian       română
    Russian        pусский
    Slovak         slovenčina
    Spanish        español
    Swahili        kiswahili
    Swedish        svenska
    Tamil          தமிழ்
    Telugu         తెలుగు
    Thai           ภาษาไทย
    Turkish        türkçe
    Ukrainian      український
    Urdu           اردو
    Vietnamese     tiếng%20việt
    Welsh          cymraeg
    Wolof          wolof

### Various explore() Shortcut Methods

#### topPicks(cookie, params)
Your top picks

```javascript
{
  hasRated: 'no',
  sortBy: 'prediction'
}
```

#### recentReleases(cookie, params)
Recently released movies.

```javascript
{
  hasRated: 'no',
  maxDaysAgo: 90,
  maxFutureDays: 0,
  sortBy: 'releaseDate'
}
```

#### favoritesYear(cookie, params)
Favorites within the last year.

```javascript
{
  hasRated: 'no',
  maxDaysAgo: 365,
  maxFutureDays: 0,
  minPop: 100,
  sortBy: 'avgRating'
}
```

#### newAdditions(cookie, params)
The movies most recently added to MovieLens.

```javascript
{
  sortBy: 'dateAdded'
}
```

#### getMyRatings(cookie, params)
Movies which you've rated.

```javascript
{
  hasRated: 'yes',
  sortBy: 'userRatedDate'
}
```

#### getMyWishlist(cookie, params)
Movies in your wishlist.

```javascript
{
  hasWishlisted: 'yes',
  sortBy: 'userListedDate'
}
```

#### getMyHiddenMovies(cookie, params)
Movies you've hidden.

```javascript
{
  hasHidden: 'yes'
}
```
