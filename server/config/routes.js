var reviewController = require('../reviews/reviewController.js');
var userController = require('../users/userController.js');
var commentController = require('../comments/commentController.js');
var jwt = require('express-jwt');

//Checks the token for authentication when attatched to route
var authCheck = jwt({
  secret: new Buffer('xb2O15v26aHQwrEBHj9g0ClMWPUU8qbQic2nWheL1ZILYWesPn3V67nPGF8H95Lv', 'base64'),
  audience: '0cUlkKsftRF5gApO4Y6ojv3Rk5PZX8eE'
});

module.exports = function (app, express) {

  //Review Routes
  app.get('/review/:type/:typeId', reviewController.getReviews);

  app.post('/review/:type/:typeId', authCheck, reviewController.postReview);

  app.get('/review/:reviewId', reviewController.getReviewById);

  app.put('/review/:reviewId', authCheck, reviewController.editReview);

  app.put('/review/count/:reviewId', authCheck, reviewController.editCount);

  app.delete('/review/:reviewId', authCheck, reviewController.deleteReview);

  //Comment Routes
  app.get('/comment/:reviewId', commentController.getCommentByReviewId);

  app.post('/comment', authCheck, commentController.postComment);

  app.delete('/comment/:commentId', authCheck, commentController.deleteComment);

  //User Routes
  app.get('/user/:username', userController.getUserByUsername);

  app.get('/user/reviews/:userId', reviewController.getUserReviews);

  app.post('/user', authCheck, userController.postUser);

  app.put('/user/edit', authCheck, userController.editUser);

  app.delete('/user/delete', authCheck, userController.deleteUser);

  //User favorites/watched/currently watching routes
  app.get('/favorites', authCheck, userController.getUserLists);

  app.delete('/delete/:type', authCheck, userController.removeFromUserLists);

  app.post('/add/:type', authCheck, userController.addToUserLists);

};
