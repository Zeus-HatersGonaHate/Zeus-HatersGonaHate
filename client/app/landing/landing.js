angular.module('zeus.landing', [])
.controller('LandingController', function(Landing) {
  // capture the value of `this` in a variable vm
  // vm stands for view model and is a replacement for $scope
  var LandingVm = this;
  LandingVm.popularmovies = {};
  LandingVm.latestmovies = {};
  LandingVm.upcomingmovies = {};
  LandingVm.popularshows = {};
  LandingVm.latestshows = {};

  LandingVm.fetchPopularMovies = function() {
    Landing.getPopularMovies()
      .then(function(data) {
        LandingVm.popularmovies = data.results;
      });
  };
  LandingVm.fetchLatestMovies = function() {
    Landing.getLatestMovies()
      .then(function(data) {
        LandingVm.latestmovies = data.results;
      });
  };
  LandingVm.fetchUpcomingMovies = function() {
    Landing.getUpcomingMovies()
      .then(function(data) {
        LandingVm.upcomingmovies = data.results;
      });
  };
  LandingVm.fetchPopularShows = function() {
    Landing.getPopularShows()
      .then(function(data) {
        LandingVm.popularshows = data.results;
      });
  };
  LandingVm.fetchLatestShows = function() {
    Landing.getLatestShows()
      .then(function(data) {
        LandingVm.latestshows = data.results;
      });
  };

})
.directive('popularMovie', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/popularMovie.html'
  };
})
.directive('latestMovie', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/latestMovie.html'
  };
})
.directive('upcomingMovie', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/upcomingMovie.html'
  };
})
.directive('popularShow', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/popularShow.html'
  };
})
.directive('latestShow', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/landing/latestShow.html'
  };
});

