angular.module('zeus.user', [])
  .controller('UserController', function($scope, User, $stateParams) {
    $scope.username = $stateParams.username;

    //set up user information based on username given in route
    User.getUserId($stateParams.username)
      .then(function(user){
        var userObj = user;
        $scope.userId = userObj._id;
        $scope.userIdAuth = userObj.user_id;
        $scope.about = userObj.about;
        $scope.profilePic = userObj.profilePicLink;
        $scope.email = userObj.email;
        $scope.favorites = userObj.favorites;
        User.getUserReviews($scope.userIdAuth)
          .then(function(reviews) {
            $scope.reviews = reviews;
          });
      });
  });