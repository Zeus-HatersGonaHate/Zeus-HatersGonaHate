angular.module('zeus.details', [])
  .controller('DetailsController', function($scope, Details, $routeParams) {
    $scope.data = {};
    $scope.reviews = {};
    $scope.hasReview = false;
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;
    Details.getDetails($scope.type, $scope.id).then(function(data) {
      $scope.data = data;
      $scope.original_title = $scope.data.original_title;
      $scope.original_name = $scope.data.original_name;
      $scope.poster_path = $scope.data.poster_path;
      $scope.overview = $scope.data.overview;
      Details.getActors($scope.original_title).then(function(data) {
        $scope.actors = data.Actors.split(',');
        console.log($scope.original_title);
      });
    });
    var getReviews = function() {
      Details.getReviews($scope.type, $scope.id).then(function (reviews) {
        $scope.reviews = reviews.data;
        if ($scope.reviews.length > 0) {
          $scope.hasReview = true;
        }
        return reviews.data;
      });

    };
    getReviews();

    $scope.post = function() {
      var info = {
        username: 'Nancy', //Fix: need to add in real username
        title: $scope.reviewTitle,
        content: $scope.reviewBody,
        rating: $scope.reviewRating
      };
      Details.postReview($scope.type, $scope.id, info).then(function(review) {
        $scope.reviews.unshift(review.data);
        $scope.hasReview = true;
        //Clear input fields
        $scope.reviewTitle = '';
        $scope.reviewBody = '';
        $scope.reviewRating = '';
      });
    };

    var today = new Date();
    var year = today.getFullYear().toString();
    var month = (today.getMonth() + 1).toString();
    var day = today.getDate().toString();
    $scope.fullDate = year + '-' + month + '-' + day;

    $scope.zip = '';
    $scope.hasNoShowtime = false;

    $scope.getShowtimes = function() {
      Details.getShowtimes($scope.fullDate, $scope.zip).then(function(showtimes) {
        $scope.showtimes = showtimes;
        var nowPlaying = [];
        if (showtimes) {
          showtimes.forEach(function(showtime) {
            nowPlaying.push(showtime.title);
          });
          if (!nowPlaying.includes($scope.original_title)) {
            $scope.hasNoShowtime = true;
          }
          console.log('showtimes ' + showtimes);
        } else {
          $scope.hasNoShowtime = true;
        }
      });
      $scope.zip = '';
    };
  });



