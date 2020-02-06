var Reviews = require('./index.js')

var helpers = {
    get: () => Reviews.aggregate().sample(100).sort({time: 1})
 

}

module.exports = helpers;