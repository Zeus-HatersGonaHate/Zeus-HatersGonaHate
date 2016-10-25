angular.module('zeus.results', [])
.controller('ResultsController', function($scope, Results, $routeParams) {
  $scope.results = [];
  $scope.loaded = false;
  $scope.pages = 1;
  var search = $routeParams.search;
  Results.multiSearch(search)
    .then(function(results) {
      $scope.loaded = true;
      $scope.results = results.data.results;
      $scope.totalPages = results.data.total_pages;
      $scope.totalResults = results.data.total_results;
      console.log($scope.results);
    });
});