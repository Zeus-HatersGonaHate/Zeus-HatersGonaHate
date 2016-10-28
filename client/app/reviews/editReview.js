angular.module('zeus.editReview', [])
.controller('editReviewController', function($location, $stateParams, Details) {
  var EditReviewVm = this;
  var id = $stateParams.id;
  var currentUser = JSON.parse(localStorage.getItem('profile'));
  EditReviewVm.title = '';
  EditReviewVm.content = '';
  EditReviewVm.rating = '';

  Details.getReviewById(id)
    .then(function(reviewInfo){
      console.log(currentUser)
      if(currentUser === null || currentUser.user_id !== reviewInfo.review.user_id){
        return EditReviewVm.cancel();
      }

      EditReviewVm.title = reviewInfo.review.title;
      EditReviewVm.content = reviewInfo.review.content;
      EditReviewVm.rating = reviewInfo.review.rating;
    });

  EditReviewVm.edit = function(){
    var updatedReview = {
      content: EditReviewVm.content,
      title: EditReviewVm.title,
      rating: EditReviewVm.rating
    };
    Details.editReview(id, updatedReview)
    .then(function(){
      EditReviewVm.cancel();
    });
  };

  EditReviewVm.cancel = function(){
    $location.path('/review/' + id);
  };
});