var Review = require('../reviews/reviewModel.js');
var User = require('../users/userModel.js');

var findUserInfoById = function(reviews, callback){
  var userObj = {};
  var ids = reviews.map(function(review){
    return review.user_id;
  });
  User.find({user_id: {$in: ids}})
  .exec(function(err, users){
    users.forEach(function(userInfo){
      userObj[userInfo.user_id] = userInfo;
    });
    callback(userObj)
  });
};

// var ids = ['512d5793abb900bf3e20d012', '512d5793abb900bf3e20d011'];
// ids = ids.map(function(id) { return ObjectId(id); });
// db.test.find({_id: {$in: ids}});

module.exports = {

  //when user posts a review, this method saves it to the database
  postReview: function (req, res, next) {
    var data = req.body;
    var type = req.params.type;
    var typeId = req.params.typeId;
    var review = new Review({
      user_id: req.user.sub,
      typeId: typeId,
      type: type,
      title: data.title,
      date: new Date(),
      content: data.content,
      rating: data.rating,
      voteCount: 0
    });
    review.save(function (err, reviews) {
      if (err) {
        console.log(err);
        res.send(404);
      } else {
        User.find({user_id: req.user.sub})
        .exec(function(err, userObj){
          var data = {};
          data.reviews = reviews;
          data.users = userObj[0];
          console.log(data)
          res.json(data);
        })

      }
    });
  },

  //gets all reviews from the DB for a particular movie/show by looking at the type ('movie' or 'tv') and id number within the URL parameters
  getReviews: function (req, res, next) {
    var id = req.params.typeId;
    var type = req.params.type;
    Review.find({typeId: id})
      .sort({date: -1})
      .exec(function(err, reviews) {
        if (err) {
          console.log(err);
        } else {
          findUserInfoById(reviews, function(userObj){
            var data = {}
            data.reviews = reviews;
            data.users = userObj;
            res.send(data);
          });
        }
      });
  },

  //deletes a review from the DB based on the reviewId parameter within the URL
  deleteReview: function (req, res, next) {
    var id = req.params.reviewId;
    Review.findByIdAndRemove(id, function (err, data) {
        if (err) {
          res.send(404);
        } else {
          res.send(200);
        }
      });
  },

  //Allows a user to edit an existing review that they have posted.
  editReview: function (req, res, next) {
    var id = req.params.reviewId;
    var content = req.body.content;
    var rating = req.body.rating;
    var title = req.body.title;
    Review.findOneAndUpdate({ _id: id }, {content: content, rating: rating, title: title}, {new:true}, function (err, review) {
      res.json(review);
    });
  },

  // Upvote/downvote reviews total votes is the voteCount
  editCount: function (req, res, next) {
    var id = req.params.reviewId;
    var voteCount = req.body.voteCount; //voteCount has to be 1 or -1
    Review.findOneAndUpdate({ _id: id },
    { $inc: { voteCount:  voteCount } },
    {new: true},
    function (err, review) {
      if (err) console.log(err);
      res.json(review.voteCount);
    }
    );
  }

};