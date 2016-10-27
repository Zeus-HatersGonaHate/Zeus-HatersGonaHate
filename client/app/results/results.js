angular.module('zeus.results', [])
.controller('ResultsController', function(Results, $routeParams) {
  // capture the value of `this` in a variable vm
  // vm stands for view model and is a replacement for $scope
  var ResultsVm = this;
  ResultsVm.results = [];
  ResultsVm.loaded = false;
  ResultsVm.search = $routeParams.search;
  //direct user to first page if none is specified in url
  var page = $routeParams.page || 1;
  Results.multiSearch(ResultsVm.search, page)
    .then(function(results) {
      ResultsVm.loaded = true;
      ResultsVm.results = results.data.results;
      //create array to use ng-repeat on for page numbers
      ResultsVm.totalPages = _.range(1, results.data.total_pages + 1);
      ResultsVm.totalResults = results.data.total_results;
    });
});