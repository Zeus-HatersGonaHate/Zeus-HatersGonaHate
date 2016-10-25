var User = require('../users/UserModel.js');

module.exports = {

  //when user posts a review, this method saves it to the database
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

  //gets all reviews from the DB for a particular movie/show by looking at the type ('movie' or 'tv') and id number within the URL parameters
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
  }
}