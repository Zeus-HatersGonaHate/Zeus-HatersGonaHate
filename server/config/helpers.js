var User = require('../users/userModel.js');
var Review = require('../reviews/reviewModel.js');

module.exports = {

  //Randomly generates username for new users
  usernameMaker: function(data, callback) {
    User.count({}, function (err, count) {
      if (err) {
        console.log(err);
      } else {
        if (data.email) {
          callback(data.email.split('@')[0] + count);
        } else {
          callback(data.given_name[0] + data.family_name[0] + count);
        }
      }
    });
  },

  //Pulls information from single user
  findUserInfoById: function(reviews, callback) {
    var userObj = {};
    var ids = reviews.map(function(review) {
      return review.user_id;
    });
    User.find({user_id: {$in: ids}})
    .exec(function(err, users) {
      users.forEach(function(userInfo) {
        userObj[userInfo.user_id] = userInfo;
      });
      callback(userObj);
    });
  }

};