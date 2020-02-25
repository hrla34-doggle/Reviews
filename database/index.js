var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var reviewSchema = new mongoose.Schema({
    trips: String,
    id: Number,
    review: [{type: String}]
    // review: [{
    //   name: String,
    //   score: Number,
    //   description: String,
    //   likes: Number,
    //   time: Number,
    //   customerScore: Number,
    //   customerReview: String,
    //   quotes: String,
    // }]
  });

  var Reviews = mongoose.model('Reviews', reviewSchema);   

  module.exports = Reviews
