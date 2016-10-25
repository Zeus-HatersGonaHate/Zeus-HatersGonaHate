var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  fullName: String
});


module.exports = mongoose.model('User', UserSchema);