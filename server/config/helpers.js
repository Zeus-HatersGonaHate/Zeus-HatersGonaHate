var User = require('../users/userModel.js');
var Review = require('../reviews/reviewModel.js');
var Comment = require('../comments/commentModel.js');

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
  },

  //Checks the type given in the route and adds the item/data that list
  addToListByType: function (id, data, type, res) {
    if (type === 'favorites') {
      User.findOneAndUpdate({ user_id: id }, { $addToSet: { favorites: data } }, {new:true}, function (err, user) {
        if (err) console.log(err);
        res.json(user.watched);
    });
    } else if (type === 'watched') {
      User.findOneAndUpdate({ user_id: id }, { $addToSet: { watched: data } }, {new:true}, function (err, user) {
        if (err) console.log(err);
        res.json(user.watched);
    });
    } else if (type === 'current') {
        User.findOneAndUpdate({ user_id: id }, { $addToSet: { currentlyWatching: data } }, {new:true}, function (err, user) {
          if (err) console.log(err);
          res.json(user.currentlyWatching);
        });
    }
  },

  //Checks the type given in the route and deletes the item/data from that list
  removeFromListByType: function (id, data, type, res) {
    if (type === 'favorites') {
      User.findOneAndUpdate({ user_id: id }, { $pull: { favorites: data }}, {new: true}, function (err, user) {
        if (err) console.log(err);
        console.log(user);
        res.json(user);
      });
    } else if (type === 'watched') {
      User.findOneAndUpdate({ user_id: id }, { $pull: { watched: data }}, {new: true}, function (err, user) {
        if (err) console.log(err);
        console.log(user);
        res.json(user);
      });
    } else if (type === 'current') {
      User.findOneAndUpdate({ user_id: id }, { $pull: { currentlyWatching: data }}, {new: true}, function (err, user) {
        if (err) console.log(err);
        console.log(user);
        res.json(user);
      });
    }
  },

  //Removes the user from DB and all reviews and comments by that user
  removeUserAndReviews: function (id, res) {
    User.remove({ user_id: id })
      .exec(function (err, user) {
        Review.remove({user_id: id})
          .exec(function (err, data) {
            Comment.remove({ user_id: id })
              .exec(function(err, data) {
                if (err) console.log(err);
                res.sendStatus(201);
              });
          });
      });

  }

};