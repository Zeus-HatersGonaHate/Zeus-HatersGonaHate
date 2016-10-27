angular.module('zeus.details', [])
  .controller('DetailsController', function(Details, $routeParams) {
    // capture the value of `this` in a variable vm
    // vm stands for view model and is a replacement for $scope
    var DetailsVm = this;
    DetailsVm.data = {};
    DetailsVm.reviews = {};
    DetailsVm.users = {};
    DetailsVm.currentUser = JSON.parse(localStorage.getItem('profile'));
    DetailsVm.hasReview = false;
    DetailsVm.type = $routeParams.type; //media type, movie or tv
    DetailsVm.id = $routeParams.id; //id on themoviedb api for retrieving the movie/tv info
    Details.getDetails(DetailsVm.type, DetailsVm.id).then(function(data) {
      DetailsVm.data = data; // save all movie details for the requested movie

      //convenience properties for shorthand in html views
      DetailsVm.original_title = DetailsVm.data.original_title;
      DetailsVm.original_name = DetailsVm.data.original_name;
      DetailsVm.poster_path = DetailsVm.data.poster_path;
      DetailsVm.overview = DetailsVm.data.overview;
      //loads actor info on details page load
      Details.getActors(DetailsVm.original_title).then(function(data) {
        DetailsVm.actors = data.Actors.split(',');
      });
    });
    var getReviews = function() {
      Details.getReviews(DetailsVm.type, DetailsVm.id).then(function (reviews) {
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
      Details.postReview(DetailsVm.type, DetailsVm.id, info).then(function(review) {
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
      Details.upvote(review._id, vote)
        .then(function(reviewInfo) {
          review.voteCount = reviewInfo.voteCount;
          review.votes = reviewInfo.votes;
        });
    };

    DetailsVm.delete = function(review) {
      Details.deleteReview(review._id);
      var index = DetailsVm.reviews.indexOf(review);
      DetailsVm.reviews.splice(index, 1);
    };
  });



