angular.module('zeus.user', [])
  .controller('UserController', function($scope, User) {
    $scope.data = {};
    $scope.data.username = '';

    $scope.updateProfile = function () {
      User.editUser($scope.data);
    };


  });