/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {
  // Insert routes below
  app.use('/api/login', require('./api/login'));
  app.use('/api/orders', require('./api/orders'));
  app.use('/api/discounts', require('./api/discounts'));
  app.use('/api/clients', require('./api/clients'));
  app.use('/api/products', require('./api/products'));

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
