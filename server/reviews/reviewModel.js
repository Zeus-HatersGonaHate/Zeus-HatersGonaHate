var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  user_id: String,
  typeId: String,
  type: String,
  title: String,
  date: String,
  content: String,
  rating: Number,
  voteCount: Number,
  votes: Array
});


module.exports = mongoose.model('Review', ReviewSchema);