'use strict';

/**
 * Application routes
 */
module.exports = function(app) {

  var api = require('./controllers/api'),
      index = require('./controllers');

  // Server API Routes
  app.post('/api/searchAll', api.searchAll);
  app.post('/api/searchTracks', api.searchAll);
  app.post('/api/searchArtists', api.searchAll);
  app.post('/api/searchAlbums', api.searchAll);
  app.get('/api/getQueue', api.getQueue);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};
