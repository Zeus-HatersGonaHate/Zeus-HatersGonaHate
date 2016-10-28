angular.module('zeus.reviews', [])
.controller('ReviewsController', function($location, $stateParams, Details, authService) {
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

  ReviewsVm.vote = function(vote) {
    if(ReviewsVm.currentUser !== null){
      Details.upvote(ReviewsVm.review._id, vote)
        .then(function(reviewInfo) {
          ReviewsVm.review.voteCount = reviewInfo.voteCount;
          ReviewsVm.review.votes = reviewInfo.votes;
        });
    } else {
      ReviewsVm.login();
    }
  };

  ReviewsVm.edit = function(){
    $location.path($location.url()+"/edit");
  }

  ReviewsVm.delete = function() {
      Details.deleteReview(ReviewsVm.review._id);
      $location.path('/') //Needs to redirect to somewhere useful
    };

  ReviewsVm.login = authService.login;
});