angular.module('zeus.reviews', [])
.controller('ReviewsController', function($scope, $routeParams, Details) {
  $scope.id = $routeParams.id;
  $scope.review = {};
  $scope.user = {};
  Details.getReviewById($scope.id)
    .then(function(reviewInfo){
      $scope.review = reviewInfo.review;
      $scope.user = reviewInfo.user;
    });
});