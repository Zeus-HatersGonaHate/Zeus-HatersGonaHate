var User = require('../users/userModel.js');
var helpers = require('../config/helpers.js');

module.exports = {

  //Checks if user exists on login, if not adds the user to the database.
  postUser: function (req, res, next) {
    var id = req.user.sub;
    var info = req.body;
    var date = new Date();
    User.findOne({ user_id: id })
      .exec(function (error, data) {
        if (error) {
          console.log(error);
          res.send(500);
        } else if (!data) {
          helpers.usernameMaker(info, function (username) {
            var user = new User({
              joinDate: date.toISOString(),
              email: info.email,
              user_id: id,
              username: username,
              location: '',
              about: '',
              profilePicLink: info.picture || 'https://www.drupal.org/files/issues/default-avatar.png',
              favourites: []
            });
            user.save(function (err, userInfo) {
              if (err) {
                console.log(err);
                res.send(404);
              } else {
                res.json(userInfo);
              }
            });
          });
        } else if (data) {
          res.json(data);
        }
      });
  },

  // Get all users
  getAllUsers: function (req, res) {
    User.find()
      .exec(function (err, users) {
        if (err) {
          console.error('Error getting all users', err)
        } else {
          res.send(users);
        }
      });
  },

  //Gets user info based on the username
  getUserByUsername: function (req, res, next) {
    var username = req.params.username;
    User.find({ username: username })
      .exec(function (err, userInfo) {
        if (err) {
          console.log(err);
        } else {
          res.send(userInfo);
        }
      });
  },

  //Edit user based on the id from the token
  editUser: function (req, res, next) {
    var id = req.user.sub;
    var data = req.body;
    User.findOneAndUpdate({ user_id: id }, data, { new: true }, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    });
  },

  //Adds data to the list based on the type param ('favorites', 'watched', 'currentlyWatching')
  addToUserLists: function (req, res, next) {
    var id = req.user.sub;
    var data = req.body;
    var type = req.params.type;
    helpers.addToListByType(id, data, type, res);
  },

  //Removes data from the list based on the type param ('favorites', 'watched', 'currentlyWatching')
  removeFromUserLists: function (req, res, next) {
    var id = req.user.sub;
    var data = req.body;
    var type = req.params.type;
    helpers.removeFromListByType(id, data, type, res);
  },

  //Gets all the users information based on the token
  getUserLists: function (req, res, next) {
    var id = req.user.sub;
    User.find({ user_id: id })
      .exec(function (err, user) {
        if (err) console.log(err);
        res.json(user);
      });
  },

  //Deletes the user, reviews, comments based on the users token
  deleteUser: function (req, res, next) {
    var id = req.user.sub;
    helpers.removeUserAndReviews(id, res);
  }

};