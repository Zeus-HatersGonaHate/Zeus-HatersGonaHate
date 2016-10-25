angular.module('zeus', [
  'zeus.landing',
  'zeus.results',
  'zeus.details',
  'zeus.services',
  'zeus.user',
  'ngRoute'
])
.controller('zeusController', function($scope, $location) {
  $scope.searchQuery = '';
  $scope.search = function(search) {
    if (search.length < 1) {
      return;
    }
    $location.path('/results/' + search + '/1');
    $scope.searchQuery = '';
  };
})
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/results/:search/:page', {
      templateUrl: 'app/results/results.html',
      controller: 'ResultsController'
    })
    .when('/:type/:id', {
      templateUrl: 'app/details/details.html',
      controller: 'DetailsController'
    })
    .when('/user', {
      templateUrl: 'app/user/user.html',
      controller: 'UserController'
    });
});
