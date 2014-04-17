'use strict';

var http = require('http'),
    socketio = require('socket.io'),
    api = require('./controllers/api'),
    q = require('./models/queue');

module.exports = function(server) {
  var io = socketio.listen(server);

  //this is not working!!!!!!!!!!
  io.sockets.on('connection', function(socket) {
    socket.on('client:add', function(track) {
      q.addToQueue(track, function(err, track) {
        console.log('io:',track)
        if (err) return err;
        // q.getQueue(function(queue) {
        //   if (err) return err;
        //   io.sockets.emit('server:updateQueue', queue);
        // });
      });
    });
  });
};
