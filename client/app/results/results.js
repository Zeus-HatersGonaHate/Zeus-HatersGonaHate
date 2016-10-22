angular.module('zeus.results', [])
.controller('ResultsController', ['$scope', '$location', 'Results', function($scope, $location, Results) {
  $scope.searchQuery = "Taken";
  $scope.results = [];

  $scope.getResults = function(searchQuery) {
    Results.multiSearch(searchQuery)
      .then(function(results) {
        $location.path('/results');
        $scope.results = results.data.results;
        console.log($scope.results);
      });
  };

  $scope.getResults($scope.searchQuery);

}]);