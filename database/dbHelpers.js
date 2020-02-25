var Reviews = require('./index.js')

var helpers = {
    get: (id) => Reviews.findOne({id}),
    post: (item) => Reviews.create(item),
    put: (id, update) => Reviews.findOneAndUpdate({id}, update, { new: true }),
    delete: (id) => Reviews.findOneAndDelete({id})
}

module.exports = helpers;

// get: () => Reviews.aggregate().sample(100).sort({time: 1})