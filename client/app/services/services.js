angular.module('zeus.services', [])
.factory('Details', function($http) {
  var getReviews = function (type, id) {
    return $http({
      method: 'GET',
      url: '/review/' + type + '/' + id
    })
    .then(function (res) {
      return res;
    });
  };
  var getDetails = function (type, id, callback) {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    }).then(function (res) {
      return res.data;
    });
  };

  return {
    getDetails: getDetails,
    getReviews: getReviews
  };

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