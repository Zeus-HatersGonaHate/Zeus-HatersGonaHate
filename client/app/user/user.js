angular.module('zeus.user', [])
  .controller('UserController', function($scope, User, $routeParams) {
    console.log('user page loaded');
    $scope.username = $routeParams.username;

    //set up user information based on username given in route
    User.getUserId($routeParams.username)
      .then(function(user){
        var userObj = user;
        console.log('--------- userObj -------');
        console.log(userObj);
        $scope.userId = userObj._id;
        $scope.profilePic = userObj.profilePicLink;
        $scope.email = userObj.email;
        $scope.favorites = userObj.favorites;
      });

    var getUserReviews = function () {
      User.getUserReviews($scope.username) //username will change, so probably better to pass user id here
        .then(function(reviews) {
          $scope.reviews = reviews.data;
        });
    };
    getUserReviews();

  });