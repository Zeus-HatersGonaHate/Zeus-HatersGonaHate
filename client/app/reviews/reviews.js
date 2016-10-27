angular.module('zeus.reviews', [])
.controller('ReviewsController', function($scope, $stateParams, Details) {
  $scope.id = $stateParams.id;
  $scope.review = {};
  $scope.user = {};
  Details.getReviewById($scope.id)
    .then(function(reviewInfo){
      $scope.review = reviewInfo.review;
      $scope.user = reviewInfo.user;
    });
});