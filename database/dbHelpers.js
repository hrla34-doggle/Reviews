var Reviews = require('./index.js')

var helpers = {
    get: () => Reviews.find({}).sort({time: 1})
 

}

module.exports = helpers;