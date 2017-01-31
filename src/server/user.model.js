var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  id: Number,
  name: String,
  score: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;
