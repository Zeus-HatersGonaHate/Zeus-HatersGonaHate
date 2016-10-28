var User = require('../users/userModel.js');
var helpers = require('../config/helpers.js');

module.exports = {

  postUser: function (req, res, next) {
    var info = req.body;
    var date = new Date();
    User.find({ user_id: info.user_id })
      .exec(function (error, data) {
        //console.log(data);
        if (error) {
          console.log(error);
          res.send(500);
        } else if (data.length === 0) {
          helpers.usernameMaker(info, function (username) {
            var user = new User({
              joinDate: date.toISOString(),
              email: info.email,
              user_id: info.user_id,
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
                //console.log(userInfo);
                res.json(userInfo);
              }
            });
          });
        } else {
          res.json(data);
        }
      });
    },

  getUserByUsername: function (req, res, next) {
    var username = req.params.username;
    User.find({username: username})
      .exec(function(err, userInfo) {
        if (err) {
          console.log(err);
        } else {
          res.send(userInfo);
        }
      });
  },

  editUser: function (req, res, next) {
    var id = req.user.sub;
    var data = req.body;
    User.findOneUpdate({ user_id: id }, data, {new: true}, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    });
  },

  addToFavorites: function (req, res, next) {
    var id = req.user.sub;
    var data = req.body;
    User.findOneAndUpdate({ user_id: id }, { $addToSet: { favorites: data } }, {new: true}, function (err, user) {
      if (err) console.log(err);
      //console.log(user);
      res.json(user.favorites);
    });
  },

  getUserFavorites: function (req, res, next) {
    var id = req.user.sub;
    User.find({ user_id: id })
      .exec(function (err, user) {
        if (err) console.log(err);
        res.json(user);
      });
  },

  addToWatchedList: function (req, res, next) {
    var id = req.user.sub;
    var data = req.body;
    User.findOneAndUpdate({ user_id: id }, { $addToSet: { watched: data } }, {new:true}, function (err, user) {
      if (err) console.log(err);
      //console.log(user);
      res.json(user.watched);
    });
  },

  deleteFavOrWatch: function (req, res, next) {
    var id = req.user.sub;
    var type = req.params.type;
    var data = req.body;
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
    }
  }

};