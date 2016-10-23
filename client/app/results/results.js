angular.module('zeus.results', [])
.controller('ResultsController', function($scope, Results, $routeParams) {
  $scope.results = [];
  $scope.loaded = false;
  var search = $routeParams.search;
    Results.multiSearch(search)
      .then(function(results) {
        $scope.loaded = true;
        $scope.results = results.data.results;
        console.log($scope.results);
      });
});