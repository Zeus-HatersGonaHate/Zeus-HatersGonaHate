angular.module('zeus.reviews', [])
.controller('ReviewsController', function($location, $stateParams, Details, authService, Reviews, Comment) {

  var ReviewsVm = this;
  ReviewsVm.id = $stateParams.id;
  ReviewsVm.review = {};
  ReviewsVm.user = {};
  ReviewsVm.comments = [];
  ReviewsVm.commentsUser = {};
  ReviewsVm.movie = {};
  ReviewsVm.currentUser = JSON.parse(localStorage.getItem('profile'));
  Reviews.getReviewById(ReviewsVm.id)
    .then(function(reviewInfo) {
      ReviewsVm.review = reviewInfo.review;
      ReviewsVm.user = reviewInfo.user;
      //Find movie info for review
      Details.getDetails(reviewInfo.review.type, reviewInfo.review.typeId)
      .then(function(movieInfo) {
        ReviewsVm.movie = movieInfo;
      });
      //Find comments for review
      Comment.getComment(ReviewsVm.id)
      .then(function(comments) {
        ReviewsVm.comments = comments.comments;
        ReviewsVm.commentsUser = comments.users;
        console.log(comments);
      });
    });

  ReviewsVm.postComment = function() {
    var comment = {
      user_id: ReviewsVm.currentUser,
      review_id: ReviewsVm.id,
      content: ReviewsVm.content
    };
    Comment.postComment(comment)
    .then(function(newComment) {
      ReviewsVm.comments.unshift(newComment.comment);
      ReviewsVm.commentsUser[newComment.user.user_id] = newComment.user;
    });
    ReviewsVm.content = '';
  };

  ReviewsVm.deleteComment = function(comment) {
    Comment.deleteComment(comment._id);
    var index = ReviewsVm.comments.indexOf(comment);
    ReviewsVm.comments.splice(index, 1);
  };

  ReviewsVm.vote = function(vote, auth) {
    if (auth) {
      Reviews.upvote(ReviewsVm.review._id, vote)
        .then(function(reviewInfo) {
          ReviewsVm.review.voteCount = reviewInfo.voteCount;
          ReviewsVm.review.votes = reviewInfo.votes;
        });
    } else {
      ReviewsVm.login();
    }
  };

  ReviewsVm.edit = function() {
    $location.path($location.url() + '/edit');
  };

  ReviewsVm.delete = function() {
    Reviews.deleteReview(ReviewsVm.review._id);
    $location.path('/'); //Needs to redirect to somewhere useful
  };

  ReviewsVm.login = authService.login;
});