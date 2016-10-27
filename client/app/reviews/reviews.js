angular.module('zeus.reviews', [])
.controller('ReviewsController', function($stateParams, Details) {
  var ReviewsVm = this;
  ReviewsVm.id = $stateParams.id;
  ReviewsVm.review = {};
  ReviewsVm.user = {};
  ReviewsVm.movie = {};
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
});