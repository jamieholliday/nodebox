'use strict';

var http = require('http'),
    socketio = require('socket.io'),
    api = require('./controllers/api'),
    q = require('./models/queue');

module.exports = function(server) {
  var io = socketio.listen(server);

  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    socket.on('client:add', function(track) {
      q.addToQueue(track, function(err, track) {
        if (err) return err;
        //play the queue
        api.playQueue(function(track) {
          console.log('now playing')
          io.sockets.emit('server:nowPlaying', track);
        });

        //return the current queue
        q.getQueue(function(err, queue) {
          console.log('queue');
          if (err) {
            console.log(err);
          }
          io.sockets.emit('server:updateQueue', queue);
        });
      });
    });
  });
};
