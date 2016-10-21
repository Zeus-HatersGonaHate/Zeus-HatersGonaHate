var reviewController = require('../reviews/reviewController.js');
var userController = require('../users/userController.js');

module.exports = function (app, express) {

  //Review Routes
  app.get('/review/:movieId', reviewController.getReviews);
  app.post('/review', reviewController.postReview);
  app.put('/review/:reviewId', reviewController.editReview);
  app.put('/review/count/:reviewId', reviewController.editCount);
  app.delete('/review/:reviewId', reviewController.deleteReview);
};