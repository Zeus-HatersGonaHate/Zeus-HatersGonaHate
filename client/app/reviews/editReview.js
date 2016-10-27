angular.module('zeus.editReview', [])
.controller('editReviewController', function($location, $stateParams, Details) {
  var EditReviewVm = this;
  var id = $stateParams.id;
  EditReviewVm.title = '';
  EditReviewVm.content = '';
  EditReviewVm.rating = '';
  Details.getReviewById(id)
    .then(function(reviewInfo){
      EditReviewVm.title = reviewInfo.review.title;
      EditReviewVm.content = reviewInfo.review.content;
      EditReviewVm.rating = reviewInfo.review.rating;
      console.log(EditReviewVm.rating)
    });
});