var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var reviewSchema = new mongoose.Schema({
    name: String,
    id: Number,
    score: Number,
    description: String,
    likes: Number,
    time: Number
  });

  var Reviews = mongoose.model('Reviews', reviewSchema);   

  module.exports = Reviews
