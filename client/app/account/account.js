angular.module('zeus.account', [])
.controller('AccountController', function($location, $stateParams, Details, User, authService) {
  var AccountVm = this;
  AccountVm.usernameTaken = false;

  //so, Details.getUserFavorites actually returns the whole user record, not just favorites. That's why it's being used here.
  Details.getUserFavorites()
    .then(function(user) {
      AccountVm.email = user.email;
      AccountVm.username = user.username;
      AccountVm.originalUsername = user.username; //for use with HTML validation checking
      AccountVm.about = user.about;
      AccountVm.joinDate = user.joinDate;
      AccountVm.fullName = user.fullName;
      AccountVm.location = user.location;
      AccountVm.profilePic = user.profilePicLink;
    });

  AccountVm.usernameTaken = function(username) {
    var taken = false;
    User.getUserId(username).then(function(res) {
      AccountVm.taken = res;
    });
    return;
  };

  AccountVm.update = function() {
    var updatedAccount = {
      email: AccountVm.email,
      username: AccountVm.username,
      fullName: AccountVm.fullName,
      about: AccountVm.about,
      location: AccountVm.location
    };
    User.editUser(updatedAccount); //starts chain to save info to DB
    $location.path('/user');
  };

  AccountVm.cancel = function(){
    $location.path('/account');
  };

  AccountVm.deleteUser = function() {
    var confirmed = confirm("Are you sure you want to delete your account? Rotten Tomatoes user interface is soooo ugly!!! Are you suuuurrrree???");
    if (confirmed) {
      User.deleteUser()
        .then(function(res){
          authService.logout();
          $location.path('/');
        });
    }
  };
});