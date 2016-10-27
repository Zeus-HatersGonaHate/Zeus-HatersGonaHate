angular.module('zeus.details', [])
  .controller('DetailsController', function($scope, Details, $routeParams) {
    $scope.data = {};
    $scope.reviews = {};
    $scope.users = {}
    $scope.currentUser = JSON.parse(localStorage.getItem('profile'))
    $scope.hasReview = false;
    $scope.type = $routeParams.type; //media type, movie or tv
    $scope.id = $routeParams.id; //id on themoviedb api for retrieving the movie/tv info
    Details.getDetails($scope.type, $scope.id).then(function(data) {
      $scope.data = data; // save all movie details for the requested movie

      //convenience properties for shorthand in html views
      $scope.original_title = $scope.data.original_title;
      $scope.original_name = $scope.data.original_name;
      $scope.poster_path = $scope.data.poster_path;
      $scope.overview = $scope.data.overview;
      //loads actor info on details page load
      Details.getActors($scope.original_title).then(function(data) {
        $scope.actors = data.Actors.split(',');
      });
    });
    var getReviews = function() {
      Details.getReviews($scope.type, $scope.id).then(function (reviews) {
        $scope.reviews = reviews.data.reviews;
        $scope.users = reviews.data.users;
        if ($scope.reviews.length > 0) {
          $scope.hasReview = true;
        }
        return reviews.data;
      });

    };
    getReviews();

    // adds a review to the database
    $scope.post = function() {
      var info = {
        title: $scope.reviewTitle,
        content: $scope.reviewBody,
        rating: $scope.reviewRating
      };
      Details.postReview($scope.type, $scope.id, info).then(function(review) {
        $scope.reviews.unshift(review.data.reviews);
        $scope.users[review.data.users.user_id] = review.data.users;
        $scope.hasReview = true;
        //Clear input fields
        $scope.reviewTitle = '';
        $scope.reviewBody = '';
        $scope.reviewRating = '';
      });
    };

    //Get current time info when user visits page to request today's showtimes
    var today = new Date();
    var year = today.getFullYear().toString();
    var month = (today.getMonth() + 1).toString();
    var day = today.getDate().toString();
    $scope.fullDate = year + '-' + month + '-' + day;

    $scope.zip = '';

    //function is called when the user submits a zip code to get local showtimes
    $scope.getShowtimes = function() {
      Details.getShowtimes($scope.fullDate, $scope.zip).then(function(showtimes) {
        $scope.showtimes = showtimes;
        console.log(showtimes);
      });
      $scope.zip = '';
    };

    $scope.vote = function(review, vote){
      Details.upvote(review._id, vote)
        .then(function(reviewInfo){
        review.voteCount = reviewInfo.voteCount;
        review.votes = reviewInfo.votes
      });
    };

    $scope.delete = function(review){
      Details.deleteReview(review._id);
      var index = $scope.reviews.indexOf(review)
      $scope.reviews.splice(index, 1)
    };
  });



