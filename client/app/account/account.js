angular.module('zeus.account', [])
  .controller('AccountController', function(Account, $stateParams) {
    var AccountVm = this;
    AccountVm.currentUser = JSON.parse(localStorage.getItem('profile'));
  });