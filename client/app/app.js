angular.module('zeus', [
  'zeus.landing',
  'zeus.results',
  'zeus.details',
  'zeus.services',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/results', {
      templateUrl: 'app/results/results.html',
      controller: 'ResultsController'
    })
    .when('/:type/:id', {
      templateUrl: 'app/details/details.html',
      controller: 'DetailsController'
    });
});