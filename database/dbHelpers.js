var Reviews = require('./index.js')

var helpers = {
    get: () => {
        const trips = ['Egypt', 'Kenya', 'Morocco', 'South Africa','China', 'Israel', 'India', 'Japan', 'South Korea', 'Thailand', 'Vietnam','France', 'Germany', 'Greece', 'Ireland', 'Italy', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Russia', 'Spain', 'Switzerland', 'United Kingdom','United States', 'Costa_Rica', 'Mexico', 'Canada','Brazil', 'Peru', 'Australia', 'New Zealand', 'Colombia'];
        var trip = trips[Math.floor(Math.random() * Math.floor(trips.length))]
         return Reviews.find({trips: trip}).sort({time: 1})
    }

}

module.exports = helpers;

// get: () => Reviews.aggregate().sample(100).sort({time: 1})