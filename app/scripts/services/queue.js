//this service is shared queue logic between controllers
'use strict';
angular.module('nodeboxApp')
	.factory('Queue', function($rootScope, Socket) {

		var queue = {
			_queue: [],
			_playing : [],
			_searchResults: {},

			add: function(track) {
				$rootScope.$broadcast('addedToQueue', track);
				Socket.emit('client:add', track);
			},

			update: function(currentQueue) {
				this._queue = currentQueue;
				$rootScope.$broadcast('updatedQueue', currentQueue);
			},

			get: function() {
				return this._queue;
			},

			list: function() {
				console.log(this._queue);
			},

			getNowPlaying: function() {
				return this._playing;
			},

			setNowPlaying: function(song) {
				this._playing = song;
			},

			setQueue: function(queue) {
				this._queue = queue;
			},

			getQueue: function() {
				return this._queue;
			},

			clear: function() {
				this._searchResults = {};
			},

			setSearchResults: function(data) {
				this._searchResults = data;
			},

			getSearchResults: function() {
				return this._searchResults.result;
			}
		};

		Socket.on('server:updateQueue', function(currentQueue) {
			queue.update(currentQueue);
		});

		Socket.on('server:NowPlaying', function(nowPlaying) {
			queue.setNowPlaying(nowPlaying);
		});

		return queue;
	});
