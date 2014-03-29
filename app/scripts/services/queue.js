'use strict';

angular.module('nodeboxApp')
	.factory('Queue', function($rootScope) {
		return {
			queue: [],
			playing: [],
			searchResults: {},

			add: function(song) {
				this.queue.push(song);
				$rootScope.$broadcast('addedToQueue', song);
			},

			get: function() {
				return this.queue;
			},

			list: function() {
				console.log(this.queue);
			},

			nowPlaying: function() {
				return this.playing;
			},

			clear: function() {
				this.searchResults = {};
			}
		};
	});