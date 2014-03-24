'use strict';

angular.module('nodeboxApp')
	.factory('Queue', function() {
		return {
			queue: [],

			add: function(song) {
				this.queue.push(song);
				this.list();
			},

			get: function() {
				return this.queue;
			},

			list: function() {
				console.log(this.queue);
			}
		};
	});