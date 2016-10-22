var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  username: String,
  typeId: String,
  type: String,
  title: String,
  date: String,
  content: String,
  rating: Number,
  voteCount: Number
});


module.exports = mongoose.model('Review', ReviewSchema);