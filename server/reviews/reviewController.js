var Review = require('../reviews/reviewModel.js');

module.exports = {
  postReview: function (req, res, next) {
    var data = req.body;
    var review = new Review({
      username: data.username,
      movie: data.movie,
      title: data.title,
      date: new Date(),
      review: data.review,
      rating: data.rating,
      voteCount: 0
    });
    review.save(function (err, revObj) {
      if (err) {
        console.log(err);
        res.send(404);
      } else {
        console.log('Saved');
        res.send(201);
      }
    });
  },

  getReviews: function (req, res, next) {
    var id = req.params.id;
    Review.find({movie: id})
      .sort({date: -1})
      .exec(function(err, review) {
        if (err) {
          console.log(err);
        } else {
          res.send(review);
        }
      });
  },

  deleteReview: function (req, res, next) {
    var id = req.params.reviewId;
    Review.find({ id: id })
      .remove()
      .exec(function (err, data) {
        if (err) {
          res.send(404);
        } else {
          res.send(200);
        }
      });
  },

  editReview: function (req, res, next) {

  },

  editCount: function (req, res, next) {

  }

};