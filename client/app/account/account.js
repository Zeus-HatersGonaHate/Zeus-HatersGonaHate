angular.module('zeus.account', [])
  .controller('AccountController', function($scope, Account) {
    $scope.profilePic = "https://lh3.googleusercontent.com/-kKTmPYr4dZI/AAAAAAAAAAI/AAAAAAAAAMw/D7Ak_C3TSWY/photo.jpg";
    $scope.username = "wilson.palooza4";
    $scope.email = "hardcoded@email.com";
    $scope.reviews = {}; //or [];
    $scope.favorites = {}; // or [];

    var getAccountReviews = function () {
      Account.getAccountReviews($scope.username) //username will change, so probably better to pass user id here
        .then(function(reviews) {
          $scope.reviews = reviews.data;
        });
    };
    getAccountReviews();

    var getAccountFavorites = function() {
      Account.getAccountFavorites($scope.username)
        .then(function(favorites) {
          $scope.favorites = favorites.data;
        });
    };
    getAccountFavorites();
  });