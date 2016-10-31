angular.module('zeus.user', [])
.controller('UserController', function($location, Details, User, $stateParams) {
  var UserVm = this;
  //set default views
  UserVm.currentView = 'overview';
  UserVm.currentFavoriteView = 'movies';
  UserVm.currentWatchedView = 'movies';

  UserVm.refreshInfo = function() {
    //set up user information based on username given in route (if given)
    if ($stateParams.username) {
      User.getUserId($stateParams.username)
        .then(function(userObj) {
          UserVm.protected = false; //used to hide link to edit profile

          //send user to 404 page if they try to access a user/:username route for a username that doesn't exist
          if (!userObj) {
            $location.path('404');
            return;
          }

          UserVm.userId = userObj._id;
          UserVm.email = userObj.email;
          UserVm.userIdAuth = userObj.user_id;
          UserVm.username = $stateParams.username;
          UserVm.about = userObj.about;
          UserVm.joinDate = moment(userObj.joinDate).format('MMMM Do YYYY');
          UserVm.fullName = userObj.fullName;
          UserVm.location = userObj.location;
          UserVm.profilePic = userObj.profilePicLink;
          UserVm.favorites = userObj.favorites;
          UserVm.watched = userObj.watched;
          User.getUserReviews(UserVm.userIdAuth)
            .then(function(reviews) {
              reviews.forEach((review) => {
                review.date = moment(review.date).format('MMMM Do YYYY');
              });
              UserVm.reviews = reviews;
            });
        });

    //else, no username was given in url (i.e. route was just /user) so get currently logged in user object
    } else {
      var currentUser = JSON.parse(localStorage.getItem('profile'));
      if (!currentUser) {
        $location.path('404');
        return;
      }

      Details.getUserFavorites() //this method actually returns the whole user object.
        .then(function(userObj) {
          UserVm.protected = true; //used to show link to edit profile and show remove fav buttons
          UserVm.userId = userObj._id;
          UserVm.email = userObj.email;
          UserVm.userIdAuth = userObj.user_id;
          UserVm.username = userObj.username;
          UserVm.about = userObj.about;
          UserVm.joinDate = moment(userObj.joinDate).format('MMMM Do YYYY');
          UserVm.fullName = userObj.fullName;
          UserVm.location = userObj.location;
          UserVm.profilePic = userObj.profilePicLink;
          UserVm.favorites = userObj.favorites;
          UserVm.watched = userObj.watched;
          User.getUserReviews(UserVm.userIdAuth)
            .then(function(reviews) {
              reviews.forEach((review) => {
                review.date = moment(review.date).format('MMMM Do YYYY');
              })
              UserVm.reviews = reviews;
            });
        });
    }
  };
  UserVm.refreshInfo();

  //check to see if the user has any items for a given target (movie/tv)
  //listType argument can be 'reviews', 'favorites' or 'watched'
  //target argument can be 'movies' or 'tv'
  UserVm.hasItems = function(listType, target) {
    var hasAnything = false;

    //check for favorites or watched
    if (UserVm[listType] !== undefined) {
      UserVm[listType].forEach(function(item) {
        if (item.type === target) {
          hasAnything = true;
        }
      });
    }

    //check for reviews
    if (listType === 'reviews') {
      if (Array.isArray(UserVm.reviews) && UserVm.reviews.length > 0) {
        hasAnything = true;
      }
    }

    return hasAnything;
  };

  //Function to remove item from list type ('favorites' or 'watched').
  UserVm.deleteFavOrWatch = function(type, item) {
    var confirmed = confirm("Are you sure you want to remove this from your list?");
    if (confirmed) {
      Details.deleteFavOrWatch(type, item)
      .then(function(res) {
        console.log(res);
        UserVm.refreshInfo();
      });
    }
  };
}) //Directives for rendering sub-views on the landing page.
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
})
.directive('watchedMovies', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/watchedMovies.html'
  };
})
.directive('watchedTv', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/user/watchedTv.html'
  };
});