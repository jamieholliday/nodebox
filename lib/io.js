'use strict';

var http = require('http'),
    socket = require('socket.io'),
    api = require('./controllers/api');

module.exports = function(server) {
    socket.listen(server);
}
