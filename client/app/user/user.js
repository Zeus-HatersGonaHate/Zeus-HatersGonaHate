angular.module('zeus.user', [])
  .controller('UserController', function($scope, User, $routeParams) {
    $scope.username = $routeParams.username;

    var getUserReviews = function (userIdAuth) {
      User.getUserReviews(userIdAuth) //username will change, so probably better to pass user id here
        .then(function(reviews) {
          console.log('-----reviews-----');
          console.log(reviews);
          return reviews;
        });
    };

    //set up user information based on username given in route
    User.getUserId($routeParams.username)
      .then(function(user){
        var userObj = user;
        $scope.userId = userObj._id;
        $scope.userIdAuth = userObj.user_id;
        $scope.profilePic = userObj.profilePicLink;
        $scope.email = userObj.email;
        $scope.favorites = userObj.favorites;
        $scope.reviews = getUserReviews($scope.userIdAuth);
      });
  });