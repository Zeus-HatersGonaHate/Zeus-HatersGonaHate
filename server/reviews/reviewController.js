var Review = require('../reviews/reviewModel.js');

module.exports = {
  postReview: function (req, res, next) {
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

  },

  editReview: function (req, res, next) {

  },

  editCount: function (req, res, next) {

  }

};