angular.module('zeus.details', [])
.controller('DetailsController', function($location, Details, Reviews, $stateParams, authService) {
  // capture the value of `this` in a variable vm
  // vm stands for view model and is a replacement for $scope
  var DetailsVm = this;
  DetailsVm.data = {};
  DetailsVm.reviews = {};
  DetailsVm.users = {};
  DetailsVm.hasFavorite = false;
  DetailsVm.hasWatched = false;
  DetailsVm.currentUser = JSON.parse(localStorage.getItem('profile'));
  DetailsVm.hasReview = false;
  DetailsVm.type = $stateParams.type; //media type, movie or tv
  DetailsVm.id = $stateParams.id; //id on themoviedb api for retrieving the movie/tv info
  Details.getUserFavorites()
    .then(function (res) {
      DetailsVm.favorites = res.favorites;
      DetailsVm.watched = res.watched;
      DetailsVm.checkFavorites(res.favorites, res.watched);
    });

  Details.getDetails(DetailsVm.type, DetailsVm.id).then(function(data) {
    DetailsVm.data = data; // save all movie details for the requested movie

    //convenience properties for shorthand in html views
    DetailsVm.original_title = DetailsVm.data.original_title;
    DetailsVm.original_name = DetailsVm.data.original_name;
    DetailsVm.poster_path = DetailsVm.data.poster_path;
    DetailsVm.overview = DetailsVm.data.overview;
    //loads actor info on details page load
    DetailsVm.getActors = function() {
      //if the selection is a movie
      if (DetailsVm.original_title !== undefined) {
        Details.getActors(DetailsVm.original_title).then(function(data) {
          DetailsVm.actors = data.Actors.split(',');
        });
        //if the selection is a tv show
      } else if (DetailsVm.original_name !== undefined) {
        Details.getActors(DetailsVm.original_name).then(function(data) {
          DetailsVm.actors = data.Actors.split(',');
        });
      }
    };
    DetailsVm.getActors();
  });

  var getReviews = function() {
    Reviews.getReviews(DetailsVm.type, DetailsVm.id).then(function (reviews) {
      reviews.data.reviews.forEach(function (review) {
        review.date = moment(review.date).fromNow();
      });
      DetailsVm.reviews = reviews.data.reviews;
      DetailsVm.users = reviews.data.users;
      if (DetailsVm.reviews.length > 0) {
        DetailsVm.hasReview = true;
      }
      return reviews.data;
    });

  };
  getReviews();

  // adds a review to the database
  DetailsVm.post = function() {
    var info = {
      title: DetailsVm.reviewTitle,
      content: DetailsVm.reviewBody,
      rating: DetailsVm.reviewRating
    };
    Reviews.postReview(DetailsVm.type, DetailsVm.id, info).then(function(review) {
      review.data.reviews.date = moment(review.data.reviews.date).fromNow();
      DetailsVm.reviews.unshift(review.data.reviews);
      DetailsVm.users[review.data.users.user_id] = review.data.users;
      DetailsVm.hasReview = true;
      //Clear input fields
      DetailsVm.reviewTitle = '';
      DetailsVm.reviewBody = '';
      DetailsVm.reviewRating = '';
    });
  };

  //Get current time info when user visits page to request today's showtimes
  var today = new Date();
  var year = today.getFullYear().toString();
  var month = (today.getMonth() + 1).toString();
  var day = today.getDate().toString();
  DetailsVm.fullDate = year + '-' + month + '-' + day;

  DetailsVm.zip = '';

  //function is called when the user submits a zip code to get local showtimes
  DetailsVm.getShowtimes = function() {
    Details.getShowtimes(DetailsVm.fullDate, DetailsVm.zip).then(function(showtimes) {
      DetailsVm.showtimes = showtimes;
      var nowPlaying = [];
      if (showtimes) {
        showtimes.forEach(function(showtime) {
          nowPlaying.push(showtime.title);
        });
        if (!nowPlaying.includes(DetailsVm.original_title)) {
          DetailsVm.hasNoShowtime = true;
        }
      } else {
        DetailsVm.hasNoShowtime = true;
      }
    });
    DetailsVm.zip = '';
  };

    DetailsVm.vote = function(review, vote) {
      if (DetailsVm.currentUser !== null) {
        Reviews.upvote(review._id, vote)
          .then(function(reviewInfo) {
            review.voteCount = reviewInfo.voteCount;
            review.votes = reviewInfo.votes;
          });
      } else {
        DetailsVm.login();
      }

    };

  DetailsVm.edit = function(reviewId) {
    $location.path(/review/ + reviewId + '/edit');
  };

  DetailsVm.delete = function(review) {
    Reviews.deleteReview(review._id);
    var index = DetailsVm.reviews.indexOf(review);
    DetailsVm.reviews.splice(index, 1);
  };

  DetailsVm.checkFavorites = function (fav, watch) {
    if (fav !== null) {
      if (fav.length === 0) {
        DetailsVm.hasFavorite = false;
      }
    fav.forEach((ele) => {
        if (ele.type === DetailsVm.type && ele.id === DetailsVm.id) {
          DetailsVm.hasFavorite = true;
        } else {
          DetailsVm.hasFavorite = false;
        }
      });
    }
    if (watch !== null) {
      if (watch.length === 0) {
        DetailsVm.hasWatched = false;
      }
      watch.forEach((ele) => {
        if (ele.type === DetailsVm.type && ele.id === DetailsVm.id) {
          DetailsVm.hasWatched = true;
        } else {
          DetailsVm.hasWatched = false;
        }
      });
    }
  };

  DetailsVm.addToFavorites = function () {
    var favDetails = {};
    favDetails.type = DetailsVm.type;
    favDetails.id = DetailsVm.id;
    favDetails.picture = DetailsVm.poster_path;
    if (DetailsVm.original_title) {
      favDetails.title = DetailsVm.original_title
    } else if (DetailsVm.original_name) {
      favDetails.title = DetailsVm.original_name;
    }
    Details.addToFavorites(favDetails)
      .then(function (data) {
        DetailsVm.checkFavorites(data.data, null);
      });
  };

  DetailsVm.addToWatchedList = function () {
    var watchDetails = {};
    watchDetails.type = DetailsVm.type;
    watchDetails.id = DetailsVm.id;
    watchDetails.picture = DetailsVm.poster_path;
    if (DetailsVm.original_title) {
      watchDetails.title = DetailsVm.original_title
    } else if (DetailsVm.original_name) {
      watchDetails.title = DetailsVm.original_name;
    }
    Details.addToWatchedList(watchDetails)
      .then(function (data) {
        DetailsVm.checkFavorites(null, data.data);
      });
  };

  DetailsVm.deleteFavOrWatch = function (type) {
    console.log(type)
    var deleteDetails = {};
    deleteDetails.type = DetailsVm.type;
    deleteDetails.id = DetailsVm.id;
    deleteDetails.picture = DetailsVm.poster_path;
    if (DetailsVm.original_title) {
      deleteDetails.title = DetailsVm.original_title;
    } else if (DetailsVm.original_name) {
      deleteDetails.title = DetailsVm.original_name;
    }
    console.log(type, deleteDetails)
    Details.deleteFavOrWatch(type, deleteDetails)
      .then(function (data) {
        DetailsVm.checkFavorites(data.data.favorites, data.data.watched);
      });
  };

  DetailsVm.login = authService.login;
})
.directive('showtimes', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/details/showtimes.html'
  };
})
.directive('movieDetails', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/details/movieDetails.html'
  };
})
.directive('postReview', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/details/postReview.html'
  };
})
.directive('reviewDetails', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/details/reviewDetails.html'
  };
})
.directive('actorDetails', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/details/actorDetails.html'
  };
})
.directive('detailsButtons', function () {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/details/favWatchButtons.html'
  };
});