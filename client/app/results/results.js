angular.module('zeus.results', [])
.controller('ResultsController', function($scope, Results, $routeParams) {
  $scope.results = [];
  $scope.loaded = false;
  $scope.search = $routeParams.search;
  //direct user to first page if none is specified in url
  var page = $routeParams.page || 1;
  Results.multiSearch($scope.search, page)
    .then(function(results) {
      $scope.loaded = true;
      $scope.results = results.data.results;
      //create array to use ng-repeat on for page numbers
      $scope.totalPages = _.range(1, results.data.total_pages+1);
      $scope.totalResults = results.data.total_results;
    });
});