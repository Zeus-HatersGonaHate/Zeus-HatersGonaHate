angular.module('zeus.account', [])
  .controller('AccountController', function($scope, Account) {
    $scope.test = "--- text from AccountController";
    $scope.username = "hardcoded_username";
    $scope.email = "hardcoded@email.com";
    $scope.reviews = {}; //or [];
    $scope.recentlyViewed = {}; //or [];
    $scope.favorites = {}; // or [];

    var getAccountReviews = function () {
      Account.getAccountReviews($scope.username) //username will change, so probably better to pass user id here
        .then(function(reviews) {
          $scope.reviews = reviews.data;
        });
    };
    getAccountReviews();

    var getAccountRecentlyViewed = function() {
      Account.getAccountRecentlyViewed($scope.username)
        .then(function(recentlyViewed) {
          $scope.recentlyViewed = recentlyViewed.data;
        });
    };
    getAccountRecentlyViewed();

    var getAccountFavorites = function() {
      Account.getAccountFavorites($scope.username)
        .then(function(favorites) {
          $scope.favorites = favorites.data;
        });
    };
    getAccountFavorites();
  });