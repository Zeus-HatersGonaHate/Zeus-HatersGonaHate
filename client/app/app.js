angular.module('zeus', [
  'zeus.details',
  'zeus.services',
  'zeus.landing',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
})