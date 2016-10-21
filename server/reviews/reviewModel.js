var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  username: String,
  movie: Number,
  title: String,
  date: String,
  content: String,
  rating: Number,
  voteCount: Number
});


module.exports = mongoose.model('Review', ReviewSchema);