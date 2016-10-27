angular.module('zeus', [
  'zeus.landing',
  'zeus.results',
  'zeus.details',
  'zeus.services',
  'zeus.user',
  'zeus.account',
  'zeus.reviews',
  'auth0.lock',
  'angular-jwt',
  'ui.router'
])
.controller('zeusController', function($scope, $location, authService, $http, User) {
  $scope.searchQuery = '';
  $scope.search = function(search) {
    if (search.length < 1) {
      return;
    }
    $location.path('/results/' + search + '/1');
    $scope.searchQuery = '';
  };

  $scope.login = authService.login;
  $scope.logout = function() {
    authService.logout();
  };



    //Gets user profile when logged in.
  authService.getProfileDeferred().then(function (profile) {
    console.log(profile);
    $scope.profile = profile;
    if (profile) {
      User.checkUser(profile);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider, lockProvider, jwtOptionsProvider, $httpProvider) {
  var landingState = {
    name: 'landing',
    url: '/',
    templateUrl: 'app/landing/landing.html',
    controller: 'LandingController',
    controllerAs: 'LandingVm',
    authenticate: false
  };

  var resultsState = {
    name: 'results',
    url: '/results/:search/:page',
    templateUrl: 'app/results/results.html',
    controller: 'ResultsController',
    controllerAs: 'ResultsVm',
    authenticate: false
  };

  var detailsState = {
    name: 'details',
    url: '/details/:type/:id',
    templateUrl: 'app/details/details.html',
    controller: 'DetailsController',
    controllerAs: 'DetailsVm',
    authenticate: false
  };

  var userState = {
    name: 'user',
    url: '/user/:username',
    templateUrl: 'app/user/user.html',
    controller: 'UserController',
    //controllerAs: 'UserVm',  //need to set this up
    authenticate: false
  };

  var accountState = {
    name: 'account',
    url: '/account',
    templateUrl: 'app/account/account.html',
    controller: 'AccountController',
    //controllerAs: 'AccountVm',  //need to set this up
    authenticate: true
  };

  var reviewsState = {
    name: 'reviews',
    url: '/review/:id',
    templateUrl: 'app/reviews/reviews.html',
    controller: 'ReviewsController',
    //controllerAs: 'ReviewsVm',  //need to set this up
    authenticate: false
  };

  $stateProvider.state(landingState);
  $stateProvider.state(resultsState);
  $stateProvider.state(detailsState);
  $stateProvider.state(userState);
  $stateProvider.state(accountState);
  $stateProvider.state(reviewsState);

  // $urlRouterProvider.otherwise('/');

  //Auth 0 account info
  lockProvider.init({
    clientID: 'GaWAS7TybB6Fqwa9uBw2SDVMPRGSAVDK',
    domain: 'hughes89.auth0.com'
  });
  // Sets HTML5 Mode to true, removes # from url
  //$locationProvider.html5Mode(true);

  jwtOptionsProvider.config({
    tokenGetter: ['options', function (options) {
      if (options && options.url.substr(options.url.length - 5) === '.html') {
        return null;
      }
      return localStorage.getItem('id_token');
    }],
    whiteListedDomains: ['localhost:3000'],
    unauthenticatedRedirectPath: '/login'
  });
  //Attatches token to each HTTP call
  $httpProvider.interceptors.push('jwtInterceptor');
})

.run(function ($rootScope, authService, lock, authManager) {
  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  $rootScope.authService = authService;

  // Register the authentication listener that is
  // set up in auth.service.js
  authService.registerAuthenticationListener();

  // Use the authManager from angular-jwt to check for
  // the user's authentication state when the page is
  // refreshed and maintain authentication
  authManager.checkAuthOnRefresh();

  // Register synchronous hash parser
  lock.interceptHash();
});
