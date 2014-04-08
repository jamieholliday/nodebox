'use strict';

var http = require('http'),
    socketio = require('socket.io'),
    api = require('./controllers/api'),
    queue = []; //for testing

module.exports = function(server) {
  var io = socketio.listen(server);

    io.sockets.on('connection', function(socket) {
      socket.on('client:add', function(track) {
        queue.push(track);
        io.sockets.emit('server:updateQueue', queue);
      });
    });
};
