var Comment = require('../comments/commentModel.js');
var User = require('../users/userModel.js');
var helpers = require('../config/helpers.js');

module.exports = {

  //Gets comments attatched to a certain review by the reviews ID
  getCommentByReviewId: function(req, res, next){
    var id = req.params.reviewId;
    Comment.find({review_id: id})
      .sort({Date: -1})
      .exec(function(err, comments) {
        if (err) {
          console.log(err);
        } else {
          helpers.findUserInfoById(comments, function(userObj) {
            var data = {};
            data.comments = comments;
            data.users = userObj;
            res.send(data);
          });
        }
      });
  },

  //Post a comment to a review attatching the logged in users id to it.
  postComment: function(req, res, next){
    var date = new Date;
    var data = req.body;
    var comment = new Comment({
      user_id: req.user.sub,
      review_id: data.review_id,
      content: data.content,
      Date: date.toISOString()
    });
    comment.save(function (err, comment) {
      if (err) {
        console.log(err);
        res.send(404);
      } else {
        User.find({user_id: req.user.sub})
        .exec(function(err, userObj) {
          var data = {};
          data.comment = comment;
          data.user = userObj[0];
          console.log(data);
          res.json(data);
        });
      }
    });

  },

  //Delete a comment. Uses loggin in ID to make sure it belongs to you, and the comments ID.
  deleteComment: function(req, res, next){
    var commentId = req.params.commentId;
    var userId = req.user.sub;
    Comment.findById(commentId)
      .exec(function(err, commentInfo){
        if(commentInfo.user_id === userId){
          Comment.findByIdAndRemove(commentId, function (err, comment) {
           res.json(200);
          });
        } else {
          res.send(401);
        }
      })
  },
}