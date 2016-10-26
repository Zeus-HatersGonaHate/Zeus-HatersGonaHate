var User = require('../users/UserModel.js');

//Function to randomly generate username based on email or full name
var usernameMaker = function(data, callback) {
  User.count({}, function (err, count) {
    if(err) {
      console.log(err);
    } else {
      if (data.email) {
        callback(data.email.split('@')[0] + count);
      } else {
        callback(data.given_name[0] + data.family_name[0]+ count);
      }
    }
  });
}

module.exports = {

  postUser: function (req, res, next) {
    var info = req.body;
    User.find({ user_id: info.user_id })
      .exec(function (error, data) {
        console.log(data);
        if (error) {
          console.log(error);
          res.send(500);
        }
        else if (data.length === 0) {
          usernameMaker(info, function (username) {
            var user = new User({
              email: info.email,
              user_id: info.user_id,
              username: username
            });
            user.save(function (err, userInfo) {
              if (err) {
                console.log(err);
                res.send(404);
              } else {
                console.log(userInfo);
                res.json(userInfo);
              }
            });
          })
        } else {
          res.json(data);
        }
    });
  },

  getUser: function (req, res, next) {
    var id = req.params.userId;
    User.find({_id: id})
      .exec(function(err, userInfo) {
        if (err) {
          console.log(err);
        } else {
          res.send(userInfo);
        }
      });
  },

  editUser: function (req, res, next) {
    var id =  req.user.sub;
    var data = req.body;
    User.findOneAndUpdate({ user_id: id }, {username: data.username}, {new:true}, function (err, user) {
      if (err) console.log(err);
      console.log(user);
      res.json(user);
    });
  }

};