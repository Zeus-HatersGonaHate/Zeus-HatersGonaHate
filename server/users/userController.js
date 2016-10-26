var User = require('../users/UserModel.js');

module.exports = {

  postUser: function (req, res, next) {
    var data = req.body;
    var user = new User({
      email: data.email,
      username: data.username,
    });
    User.find({ email: data.email})
      .exec(function (error, data) {
        console.log(data);
        if (error) {
          console.log(error);
          res.send(500);
        }
        else if (data.length === 0) {
          user.save(function (err, userInfo) {
            if (err) {
              console.log(err);
              res.send(404);
            } else {
              console.log(userInfo);
              res.json(userInfo);
            }
          });
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
    var data = req.body;
    console.log(data);
    User.findOneAndUpdate({ _id: data.id }, {username: data.username}, {new:true}, function (err, user) {
      if (err) console.log(err);
      console.log(user);
      res.json(user);
    });
  }

};