angular.module('zeus', [
  'zeus.landing',
  'zeus.results',
  'zeus.details',
  'zeus.services',
  'zeus.user',
  'zeus.account',
  'zeus.reviews',
  'zeus.editReview',
  'auth0.lock',
  'angular-jwt',
  'ui.router'
])
  .controller('zeusController', function ($location, authService, $http, $anchorScroll, User) {
    var ZeusVm = this;
    ZeusVm.searchQuery = '';
    ZeusVm.search = function (search) {
      if (search.length < 1) {
        return;
      }
      $location.path('/results/' + search + '/1');
      ZeusVm.searchQuery = '';
    };

    //Checks DB for user when logging in or create then when logging/sign up/in
    ZeusVm.login = function (callback) {
      authService.login();
      authService.getProfileDeferred().then(function (profile) {
        ZeusVm.profile = profile;
        if (profile && !authService.gotProfile) {
          authService.gotProfile = true;
          User.checkUser(profile);
        }
      });
    };

    ZeusVm.logout = function () {
      authService.logout();
      authService.gotProfile = false;
      $location.path('/');
    };

    ZeusVm.goToTop = function () {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('top');

      // call $anchorScroll()
      $anchorScroll();
    };

    //Gets user profile when logged in check DB to see if exists if not add it.
    authService.getProfileDeferred().then(function (profile) {
      ZeusVm.profile = profile;
      if (profile && !authService.gotProfile) {
        authService.gotProfile = true;
        User.checkUser(profile);
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, lockProvider, jwtOptionsProvider, $httpProvider) {
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
      controllerAs: 'UserVm',  //need to set this up
      authenticate: false
    };

    var userOwnState = {
      name: 'userOwn',
      url: '/user',
      templateUrl: 'app/user/user.html',
      controller: 'UserController',
      controllerAs: 'UserVm',
      authenticate: true
    };

    var accountState = {
      name: 'account',
      url: '/account',
      templateUrl: 'app/account/account.html',
      controller: 'AccountController',
      controllerAs: 'AccountVm',
      authenticate: true
    };

    var editAccountState = {
      name: 'editAccount',
      url: '/editAccount',
      templateUrl: 'app/account/editAccount.html',
      controller: 'AccountController',
      controllerAs: 'AccountVm',
      authenticate: true
    };

    var reviewsState = {
      name: 'reviews',
      url: '/review/:id',
      templateUrl: 'app/reviews/reviews.html',
      controller: 'ReviewsController',
      controllerAs: 'ReviewsVm',
      authenticate: false
    };

    var editReviewState = {
      name: 'editReview',
      url: '/review/:id/edit',
      templateUrl: 'app/reviews/editReview.html',
      controller: 'editReviewController',
      controllerAs: 'EditReviewVm',
      authenticate: true
    };

    var aboutState = {
      name: 'about',
      url: '/about',
      templateUrl: 'app/about/about.html'
    };

    var fourOhFourState = {
      name: '404',
      url: '/404',
      templateUrl: 'app/404/404.html'
    };

    $stateProvider.state(landingState);
    $stateProvider.state(resultsState);
    $stateProvider.state(detailsState);
    $stateProvider.state(userState);
    $stateProvider.state(userOwnState);
    $stateProvider.state(accountState);
    $stateProvider.state(editAccountState);
    $stateProvider.state(reviewsState);
    $stateProvider.state(editReviewState);
    $stateProvider.state(aboutState);
    $stateProvider.state(fourOhFourState);

    $urlRouterProvider.otherwise('/');

    //Auth 0 account info
    lockProvider.init({
      clientID: '0cUlkKsftRF5gApO4Y6ojv3Rk5PZX8eE',
      domain: 'jondeng.auth0.com',
      options: {
        auth: {
          redirect: false
        },
        autoclose: true
      }
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
      unauthenticatedRedirectPath: '/'
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
