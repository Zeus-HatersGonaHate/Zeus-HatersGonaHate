 angular.module('zeus.details', [])
.controller('DetailsController', function($location, Details, Reviews, $stateParams, authService) {
  // capture the value of `this` in a variable vm
  // vm stands for view model and is a replacement for $scope
  var DetailsVm = this;
  DetailsVm.loaded = false;
  DetailsVm.data = {};
  DetailsVm.reviews = [];
  DetailsVm.users = {};
  DetailsVm.hasFavorite = false;
  DetailsVm.hasWatched = false;
  DetailsVm.hasCurrent = false;
  DetailsVm.currentUser = JSON.parse(localStorage.getItem('profile'));
  DetailsVm.type = $stateParams.type; //media type, movie or tv
  DetailsVm.id = $stateParams.id; //id on themoviedb api for retrieving the movie/tv info
  //Grabs the users favorites, watched, currentlyWatching. Runs them through the check function.
  Details.getUserFavorites()
    .then(function (res) {
      DetailsVm.favorites = res.favorites;
      DetailsVm.watched = res.watched;
      DetailsVm.currentlyWatching = res.currentlyWatching;
      DetailsVm.checkFavorites(res.favorites, res.watched, res.currentlyWatching);
    });

  Details.getDetails(DetailsVm.type, DetailsVm.id).then(function(data) {
    DetailsVm.data = data; // save all movie details for the requested movie

    //convenience properties for shorthand in html views
    DetailsVm.original_title = DetailsVm.data.original_title;
    DetailsVm.original_name = DetailsVm.data.original_name;
    DetailsVm.poster_path = DetailsVm.data.poster_path;
    DetailsVm.overview = DetailsVm.data.overview;

    DetailsVm.loaded = true;
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
  })
  .catch(function(){
    DetailsVm.loaded = true;
  })

  var getReviews = function() {
    Reviews.getReviews(DetailsVm.type, DetailsVm.id).then(function (reviews) {
      reviews.data.reviews.forEach(function (review) {
        review.date = moment(review.date).format('MMMM do YYYY');
      });
      DetailsVm.reviews = reviews.data.reviews;
      DetailsVm.users = reviews.data.users;
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
      review.data.reviews.date = moment(review.data.reviews.date).format('MMMM do YYYY');
      DetailsVm.reviews.unshift(review.data.reviews);
      DetailsVm.users[review.data.users.user_id] = review.data.users;
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

  DetailsVm.vote = function(review, vote, auth) {
    if (auth) {
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

  //Function checking the users lists to see if this item exists flipping the buttons to match accordingly.
  DetailsVm.checkFavorites = function (fav, watch, currentWatch) {
    if (fav !== null) {
      if (fav.length === 0) {
        DetailsVm.hasFavorite = false;
      }
    fav.forEach((ele) => {
        if (ele.type === DetailsVm.type && ele.id === DetailsVm.id) {
          DetailsVm.hasFavorite = true;
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
        }
      });
    }
    if (currentWatch !== null) {
      if (currentWatch.length === 0) {
        DetailsVm.hasCurrent = false;
      }
      currentWatch.forEach((ele) => {
        if (ele.type === DetailsVm.type && ele.id === DetailsVm.id) {
          DetailsVm.hasCurrent = true;
        }
      });
    }
  };

  //Function to add to favorites, watched, currentlyWatching.
  DetailsVm.addToUserLists = function (type) {
    var addToList = {};
    addToList.type = DetailsVm.type;
    addToList.id = DetailsVm.id;
    addToList.picture = DetailsVm.poster_path;
    if (DetailsVm.original_title) {
      addToList.title = DetailsVm.original_title;
    } else if (DetailsVm.original_name) {
      addToList.title = DetailsVm.original_name;
    }
    Details.addToUserLists(type, addToList)
      .then(function (data) {
        if (type === 'favorites') {
          DetailsVm.hasFavorite = true;
        } if (type === 'watched') {
          DetailsVm.hasWatched = true;
        } if (type === 'current') {
          DetailsVm.hasCurrent = true;
        }
      });
  };

  //Function to remove item from favorites, watched, currentlyWatching.
  DetailsVm.deleteFavOrWatch = function (type) {
    var deleteDetails = {};
    deleteDetails.type = DetailsVm.type;
    deleteDetails.id = DetailsVm.id;
    deleteDetails.picture = DetailsVm.poster_path;
    if (DetailsVm.original_title) {
      deleteDetails.title = DetailsVm.original_title;
    } else if (DetailsVm.original_name) {
      deleteDetails.title = DetailsVm.original_name;
    }
    Details.deleteFavOrWatch(type, deleteDetails)
      .then(function (data) {
        if (type === 'favorites') {
          DetailsVm.hasFavorite = false;
        } if (type === 'watched') {
          DetailsVm.hasWatched = false;
        } if (type === 'current') {
          DetailsVm.hasCurrent = false;
        }
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