'use strict';

angular.module('nodeboxApp')
	.controller('MainCtrl', function ($scope, Queue, Api, Socket, $rootScope) {

	var setQueue = function() {
		$scope.tracks = Queue.get();
		if($scope.tracks.length < 1) {
			$scope.noTracks = true;
		}
		$scope.nowPlaying = Queue.getNowPlaying();
	};

	$rootScope.$on('updatedQueue', function() {
		setQueue();
	});

	$scope.tracks = Queue.get();
	$scope.noTracks = false;

	//get the current queue if there is one
	if(!$scope.tracks.length) {
		Api.getQueue().then(function(currentQueue) {
			Queue.update(currentQueue);
		});
	} else {
		setQueue();
	}

});
