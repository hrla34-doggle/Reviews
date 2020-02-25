var Router = require('express').Router();
const controller = require('./xcontroller.js');

Router
  .route('/api/:id')
  .get(controller.get)


module.exports = Router;