/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {
var products = require('./api/products/products.controller');
var clients = require('./api/clients/clients.controller');
  // Insert routes below
  app.get('/api/clients', clients.findAllOrById);
  //app.get('/api/clients?query=', clients.findbyQuery);
  //app.get('/api/products', products.findAllOrById);
  app.get('/api/products/:_filter?', products.findProducts);
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      console.log('DEBUG', app);
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
