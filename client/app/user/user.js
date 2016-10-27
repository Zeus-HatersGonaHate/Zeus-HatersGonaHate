angular.module('zeus.user', [])
.controller('UserController', function(User, $stateParams) {
  var UserVm = this;
  UserVm.currentView = 'overview';
  UserVm.currentFavoriteView = 'movies';
  UserVm.username = $stateParams.username;

  //set up user information based on username given in route
  User.getUserId($stateParams.username)
    .then(function(user) {
      var userObj = user;
      UserVm.userId = userObj._id;
      UserVm.userIdAuth = userObj.user_id;
      UserVm.about = userObj.about;
      UserVm.profilePic = userObj.profilePicLink;
      UserVm.email = userObj.email;
      UserVm.favorites = userObj.favorites;
      User.getUserReviews(UserVm.userIdAuth)
        .then(function(reviews) {
          UserVm.reviews = reviews;
        });
    });
})
.directive('userOverview', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/userOverview.html'
  };
})
.directive('userReviews', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/userReviews.html'
  };
})
.directive('userFavorites', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/userFavorites.html'
  };
})
.directive('favoriteTv', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/favoriteTv.html'
  };
})
.directive('favoriteMovies', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/favoriteMovies.html'
  };
});