angular.module('zeus', [
  'zeus.landing',
  'zeus.results',
  'zeus.details',
  'zeus.services',
  'ngRoute'
])
.controller('zeusController', function($scope, $location) {
  $scope.searchQuery = '';
  $scope.search = function(search) {
    if (search.length < 1) {
      return;
    }
    $location.path('/results/' + search);
    $scope.searchQuery = '';
  };
})
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/results/:search', {
      templateUrl: 'app/results/results.html',
      controller: 'ResultsController'
    })
    .when('/:type/:id', {
      templateUrl: 'app/details/details.html',
      controller: 'DetailsController'
    });
  // Sets HTML5 Mode to true, removes # from url
  $locationProvider.html5Mode(true);
});
