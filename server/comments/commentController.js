var Comment = require('../comments/commentModel.js');
var User = require('../users/userModel.js');
var helpers = require('../config/helpers.js');

module.exports = {
  getCommentByReviewId: function(req, res, next){
    var id = req.params.reviewId;
    Comment.find({review_id: id})
      .sort({date: -1})
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

  postComment: function(req, res, next){
    var data = req.body
    var comment = new Comment({
      user_id: req.user.sub,
      review_id: data.review_id,
      content: data.content,
      Date: new Date()
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
          data.users = userObj[0];
          console.log(data);
          res.json(data);
        });
      }
    });

  },

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