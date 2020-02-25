var Router = require('express').Router();
var controller = require('./controller.js');


Router
  .route(`/api/:id`)
  .get(controller.get)
  .put(controller.put)
  .delete(controller.delete)

Router
  .route('/api')
  .post(controller.post)


module.exports = Router