var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  user_id: String,
  email: String,
  username: String,
  fullName: String,
  profilePicLink: String,
  favorites: Array
});


module.exports = mongoose.model('User', UserSchema);