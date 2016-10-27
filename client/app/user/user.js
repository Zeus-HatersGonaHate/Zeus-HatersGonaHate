angular.module('zeus.user', [])
  .controller('UserController', function($scope, User, $routeParams) {
    $scope.username = "wilson.palooza4";
    // $scope.userId = User.getUserId($scope.username)

    $scope.profilePic = "https://lh3.googleusercontent.com/-kKTmPYr4dZI/AAAAAAAAAAI/AAAAAAAAAMw/D7Ak_C3TSWY/photo.jpg";
    $scope.email = "hardcoded@email.com";
    $scope.reviews = {}; //or [];
    $scope.favorites = {}; // or [];

    var getUserReviews = function () {
      User.getUserReviews($scope.username) //username will change, so probably better to pass user id here
        .then(function(reviews) {
          console.log('------------------');
          console.log(reviews);
          $scope.reviews = reviews.data;

        });
    };
    getUserReviews();

    var getUserFavorites = function() {
      User.getUserFavorites($scope.username)
        .then(function(favorites) {
          $scope.favorites = favorites.data;
        });
    };
    getUserFavorites();
  });