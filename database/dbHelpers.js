var Reviews = require('./index.js')

var helpers = {
    get: (id) => {
         return Reviews.findOne({id});
    }

}

module.exports = helpers;

// get: () => Reviews.aggregate().sample(100).sort({time: 1})