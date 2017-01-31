var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
  text: String,
  value: Number
});

var Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
