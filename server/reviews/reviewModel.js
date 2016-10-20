var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  username: String,
  title: String,
  date: String,
  review: String,
  rating: Number,
  voteCount: Number
});


module.exports = mongoose.model('Review', ReviewSchema);