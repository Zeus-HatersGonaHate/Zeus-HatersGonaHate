var reviewController = require('../reviews/reviewController.js');
var userController = require('../users/userController.js');
var jwt = require('express-jwt');

//Checks the token for authentication when attatched to route
var authCheck = jwt({
  secret: new Buffer('2e4hy18SeEf1D1TyFZ1H375OovOhyhxFu0GYZb8j9zhXygsiNlhdYWCjDaqIGl1c', 'base64'),
  audience: 'GaWAS7TybB6Fqwa9uBw2SDVMPRGSAVDK'
});

module.exports = function (app, express) {

  //Review Routes
  app.get('/review/:type/:typeId', reviewController.getReviews);

  app.post('/review/:type/:typeId', reviewController.postReview);

  app.put('/review/:reviewId', reviewController.editReview);

  app.put('/review/count/:reviewId', reviewController.editCount);

  app.delete('/review/:reviewId', reviewController.deleteReview);

  //User Routes
  app.get('/user/:userId', userController.getUser);

  app.post('/user', userController.postUser);

  app.put('/user/edit', authCheck, userController.editUser);
};