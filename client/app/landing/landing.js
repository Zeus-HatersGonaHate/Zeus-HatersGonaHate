angular.module('zeus.landing', [])
  .controller('LandingController', function($scope, Landing) {
    $scope.popularmovies = {};
    $scope.latestmovies = {};
    $scope.upcomingmovies = {};

    $scope.fetchPopularMovies = function() {
      Landing.getPopularMovies()
        .then(function(data) {
          $scope.popularmovies = data.results;
        });
    };
    $scope.fetchLatestMovies = function() {
      Landing.getLatestMovies()
        .then(function(data) {
          $scope.latestmovies = data.results;
        });
    };
    $scope.fetchUpcomingMovies = function() {
      Landing.getUpcomingMovies()
        .then(function(data) {
          $scope.upcomingmovies = data.results;
        });
    };

  });