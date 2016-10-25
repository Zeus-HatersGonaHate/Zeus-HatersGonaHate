var Review = require('../reviews/reviewModel.js');

module.exports = {

  //when user posts a review, this method saves it to the database
  postReview: function (req, res, next) {
    var data = req.body;
    var type = req.params.type;
    var typeId = req.params.typeId;
    var review = new Review({
      username: data.username,
      typeId: typeId,
      type: type,
      title: data.title,
      date: new Date(),
      content: data.content,
      rating: data.rating,
      voteCount: 0
    });
    review.save(function (err, review) {
      if (err) {
        console.log(err);
        res.send(404);
      } else {
        console.log(review);
        res.json(review);
      }
    });
  },

  //gets all reviews from the DB for a particular movie/show by looking at the type ('movie' or 'tv') and id number within the URL parameters
  getReviews: function (req, res, next) {
    var id = req.params.typeId;
    var type = req.params.type;
    Review.find({typeId: id})
      .sort({date: -1})
      .exec(function(err, review) {
        if (err) {
          console.log(err);
        } else {
          res.send(review);
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