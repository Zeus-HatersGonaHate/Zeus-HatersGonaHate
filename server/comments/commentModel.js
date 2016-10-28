var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  user_id: String,
  review_id: String,
  content: String,
  Date: String
});


module.exports = mongoose.model('Comment', CommentSchema);