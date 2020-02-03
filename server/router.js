var Router = require('express').Router();
var controller = require('./controller.js');


Router
.route('/api')
.get(controller.get)
// .post(controller.post)

// Router
// .route('/api/id')
// .put(controller.update)
// .delete(controller.delete)

module.exports = Router