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
  var postReview = function (type, id, info) {
    return $http({
      method: 'POST',
      url: '/review/' + type + '/' + id,
      data: info
    })
    .then(function(res) {
      return res;
    });
  };

  var getShowtimes = function(date, zip) {
    return $http ({
      method: 'GET',
      url: 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + date + '&zip=' + zip + '&api_key=qu8cj47gn97yj4s4cjw6fpr8'
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    getDetails: getDetails,
    getReviews: getReviews,
    postReview: postReview,
    getShowtimes: getShowtimes
  };
})

.factory('Landing', function($http) {
  var getPopularMovies = function() {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getLatestMovies = function() {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getUpcomingMovies = function() {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getPopularShows = function() {
    return $http ({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/tv/popular?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };
  var getLatestShows = function() {
    return $http ({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/tv/airing_today?api_key=144a52aa180019a468d95822c036cbce&language=en-US'
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    getPopularMovies: getPopularMovies,
    getLatestMovies: getLatestMovies,
    getUpcomingMovies: getUpcomingMovies,
    getPopularShows: getPopularShows,
    getLatestShows: getLatestShows
  };
})

.factory('Results', function($http) {
  var multiSearch = function(query, page) {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/multi?api_key=144a52aa180019a468d95822c036cbce&language=en-US&query=' + query + '&page=' + page
    })
    .then(function(res) {
      return res;
    });
  };

  return {
    multiSearch: multiSearch
  };
})

.factory('User', function($http) {
  var userData = {};

  var checkUser = function (data) {
    $http({
      method: 'POST',
      url: '/user',
      data: data
    })
    .success(function (data) {
      //Assign profile to variable
      userData.profile = data[0];
      console.log(userData.profile);
    })
};

  var editUser = function (data) {
    //attatch the id of the currently logged in profile
    data.id = userData.profile._id;
    console.log(data);
    $http({
      method:'PUT',
      url: '/user/edit',
      data: data
    });
  };

  return {
    checkUser: checkUser,
    editUser: editUser
  };
})


.service('authService', authService);

authService.$inject = ['lock', 'authManager', '$q'];

function authService(lock, authManager, $q) {

  var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
  var deferredProfile = $q.defer();

  if (userProfile) {
    deferredProfile.resolve(userProfile);
  }

  function login() {
    lock.show();
  }

  // Logging out just requires removing the user's
  // id_token and profile
  function logout() {
    deferredProfile = $q.defer();
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    authManager.unauthenticate();
    userProfile = null;
  }

  // Set up the logic for when a user authenticates
  // This method is called from app.run.js
  function registerAuthenticationListener() {
    lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();

      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          return console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        deferredProfile.resolve(profile);
      });

    });
  }

  function getProfileDeferred() {
    return deferredProfile.promise;
  }

  return {
    login: login,
    logout: logout,
    registerAuthenticationListener: registerAuthenticationListener,
    getProfileDeferred: getProfileDeferred
  };
}