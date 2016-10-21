angular.module('zeus.services', [])
.factory('Details', function($http) {

})
.factory('Landing', function($http) {

})
.factory('Results', function($http) {
  var multiSearch = function(query) {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/multi?api_key=144a52aa180019a468d95822c036cbce&language=en-US&query=' + query
    })
    .then(function(res) {
      return res;
    });
  };

  return {
    multiSearch: multiSearch
  };


});