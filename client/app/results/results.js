angular.module('zeus.results', [])
.controller('ResultsController', function($scope, Results) {
  $scope.searchQuery = "Random";
  $scope.results = [];

  $scope.getResults = function(searchQuery) {
    Results.multiSearch(searchQuery)
      .then(function(results) {
        $scope.results = results.data.results;
        console.log($scope.results);
      });
  };
})
.directive('searchResult', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      source: '='
    },
    templateUrl: 'app/results/searchResult.html'
  };
});