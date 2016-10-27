angular.module('zeus.reviews', [])
.controller('ReviewsController', function($location, $stateParams, Details) {
  var ReviewsVm = this;
  ReviewsVm.id = $stateParams.id;
  ReviewsVm.review = {};
  ReviewsVm.user = {};
  ReviewsVm.movie = {};
  ReviewsVm.currentUser = JSON.parse(localStorage.getItem('profile'));
  Details.getReviewById(ReviewsVm.id)
    .then(function(reviewInfo){
      ReviewsVm.review = reviewInfo.review;
      ReviewsVm.user = reviewInfo.user;
      Details.getDetails(reviewInfo.review.type, reviewInfo.review.typeId)
      .then(function(movieInfo){
        ReviewsVm.movie = movieInfo;
        console.log(movieInfo)
      })
    });

  ReviewsVm.edit = function(){
    $location.path($location.url()+"/edit");
  }

  ReviewsVm.delete = function(review) {
      Details.deleteReview(review._id);
      $location.path('/') //Needs to redirect to somewhere useful
    };
});