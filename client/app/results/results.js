angular.module('zeus.results', [])
.controller('ResultsController', function(Results) {
  var vm = this;
  vm.searchQuery = "Jurassic Park";
  vm.results = [];

  vm.getResults = function(searchQuery) {
    Results.multiSearch(searchQuery)
      .then(function(results) {
        console.log(results);
        vm.results = results.data.results;
      });
  };
  vm.getDefaultResults = function() {
    vm.getResults(vm.searchQuery);
  };
})
.directive('searchResult', function() {
  return {
    restrict: 'EA',
    scope: {
      source: '='
    },
    templateUrl: 'app/results/searchResult.html'
  };
});