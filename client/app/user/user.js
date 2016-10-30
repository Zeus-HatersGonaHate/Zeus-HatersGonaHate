angular.module('zeus.user', [])
.controller('UserController', function(Details, User, $stateParams) {
  var UserVm = this;
  //set default views
  UserVm.currentView = 'overview';
  UserVm.currentFavoriteView = 'movies';
  UserVm.currentWatchedView = 'movies';

  //set username (if it exists in stateParams i.e. if it exists in route)
  UserVm.username = $stateParams.username;

  //set up user information based on username given in route
  UserVm.refreshInfo = function() {
    if ($stateParams.username) {
      User.getUserId($stateParams.username)
        .then(function(userObj) {
          UserVm.protected = false; //used to hide link to edit profile
          UserVm.userId = userObj._id;
          UserVm.email = userObj.email;
          UserVm.userIdAuth = userObj.user_id;
          UserVm.about = userObj.about;
          UserVm.joinDate = userObj.joinDate;
          UserVm.fullName = userObj.fullName;
          UserVm.location = userObj.location;
          UserVm.profilePic = userObj.profilePicLink;
          UserVm.favorites = userObj.favorites;
          UserVm.watched = userObj.watched;
          User.getUserReviews(UserVm.userIdAuth)
            .then(function(reviews) {
              UserVm.reviews = reviews;
            });
        });
    } else {
      Details.getUserFavorites() //this method actually returns the whole user object.
        .then(function(userObj) {
          UserVm.protected = true; //used to show link to edit profile and show remove fav buttons
          UserVm.userId = userObj._id;
          UserVm.email = userObj.email;
          UserVm.userIdAuth = userObj.user_id;
          UserVm.username = userObj.username;
          UserVm.about = userObj.about;
          UserVm.joinDate = userObj.joinDate;
          UserVm.fullName = userObj.fullName;
          UserVm.location = userObj.location;
          UserVm.profilePic = userObj.profilePicLink;
          UserVm.favorites = userObj.favorites;
          UserVm.watched = userObj.watched;
          User.getUserReviews(UserVm.userIdAuth)
            .then(function(reviews) {
              UserVm.reviews = reviews;
            });
        });
    }
  };
  UserVm.refreshInfo();

  //check to see if the user has any favorites for a given target (movie/tv)
  UserVm.hasFavorites = function(target) {
    var hasFavs = false;
    if (UserVm.favorites !== undefined) {
      UserVm.favorites.forEach(function(item){
        if (item.type === target) {
          hasFavs = true;
        }
      });
    }
    return hasFavs;
  };

  //Function to remove item from list type ('favorites' or 'watched').
  UserVm.deleteFavOrWatch = function(type, favorite) {
    var confirmed = confirm("Are you sure you want to remove this from your list?");
    if (confirmed) {
      Details.deleteFavOrWatch(type, favorite)
      .then(function(res) {
        console.log(res);
        UserVm.refreshInfo();
      });
    }
  };
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
})
.directive('userWatchlist', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/userWatchlist.html'
  };
});
// .directive('watchedMovies', function() {
//   return {
//     restrict: 'AE',
//     replace: true,
//     scope: true,
//     templateUrl: 'app/user/watchedMovies.html'
//   };
// })
// .directive('watchedTv', function() {
//   return {
//     restrict: 'AE',
//     replace: true,
//     scope: true,
//     templateUrl: 'app/user/watchedTv.html'
//   };
// });