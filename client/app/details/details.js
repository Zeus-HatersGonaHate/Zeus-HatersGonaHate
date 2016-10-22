angular.module('zeus.details', [])
  .controller('DetailsController', function($scope, Details, $routeParams) {
    $scope.data = {};
    $scope.reviews = {};
    $scope.hasReview = false;
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;
    Details.getDetails($scope.type, $scope.id).then(function(data){
      $scope.data = data;
      $scope.original_title = $scope.data.original_title;
      $scope.original_name = $scope.data.original_name;
      $scope.poster_path = $scope.data.poster_path;
      $scope.overview = $scope.data.overview;
    });
    Details.getReviews($scope.type, $scope.id).then(function (reviews) {
      $scope.reviews = reviews.data;
      if ($scope.reviews.length > 0) {
        $scope.hasReview = true;
      }
    });


  });



