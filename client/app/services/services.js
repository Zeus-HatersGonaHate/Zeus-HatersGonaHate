angular.module('zeus.services', [])
.factory('Details', function($http) {
  var getReviews = function (type, id) {
    return $http({
      method: 'GET',
      url: '/review/' + type + '/' + id
    })
    .then(function (res) {
      return res;
    });
  };
  var getDetails = function (type, id, callback) {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    }).then(function (res) {
      return res.data;
    });
  };
  var postReview = function (type, id, info) {
    return $http({
      method: 'POST',
      url: '/review/' + type + '/' + id,
      data: info
    })
    .then(function(res) {
      return res;
    });
  };

  return {
    getDetails: getDetails,
    getReviews: getReviews,
    postReview: postReview
  };
})

.factory('Landing', function($http) {
  var getPopularMovies = function() {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getLatestMovies = function() {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getUpcomingMovies = function() {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getPopularShows = function() {
    return $http ({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/tv/popular?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };
  var getLatestShows = function() {
    return $http ({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/tv/airing_today?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    getPopularMovies: getPopularMovies,
    getLatestMovies: getLatestMovies,
    getUpcomingMovies: getUpcomingMovies,
    getPopularShows: getPopularShows,
    getLatestShows: getLatestShows
  };
})

.factory('Results', function($http) {
  var multiSearch = function(query, page) {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/multi?api_key=144a52aa180019a468d95822c036cbce&language=en-US&query=' + query + '&page=' + page
    })
    .then(function(res) {
      return res;
    });
  };

  return {
    multiSearch: multiSearch
  };
})

.factory('User', function() {

  // return {

  // }
});