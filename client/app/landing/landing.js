angular.module('zeus.landing', [])
  .controller('LandingController', function($scope, Landing) {
    $scope.populars = {};
    $scope.latests = {};
    $scope.upcomings = {};

    $scope.fetchPopular = function() {
      Landing.getPopular()
        .then(function(data) {
          $scope.populars = data.results;
        });
    };
    $scope.fetchLatest = function() {
      Landing.getLatest()
        .then(function(data) {
          $scope.latests = data.results;
        });
    };
    $scope.fetchUpcoming = function() {
      Landing.getUpcoming()
        .then(function(data) {
          $scope.upcomings = data.results;
        });
    };

  });