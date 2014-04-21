'use strict';

angular.module('nodeboxApp')
	.controller('MainCtrl', function ($scope, Queue, Api, Socket, $rootScope) {

	var setQueue = function() {
		$scope.tracks = Queue.get();
		if($scope.tracks.length < 1) {
			$scope.noTracks = true;
		} else {
			$scope.noTracks = false;
		}
	};

	var setNowPlaying = function() {
		$scope.nowPlaying = Queue.getNowPlaying();
	};

	//Setup
	$scope.tracks = Queue.get();
	$scope.nowPlaying = Queue.getNowPlaying();
	$scope.noTracks = true;

	//get the current queue if there is one
	if(!$scope.tracks.length) {
		Api.getQueue().then(function(currentQueue) {
			Queue.update(currentQueue);
		});
	} else {
		setQueue();
	}

	//Root Events
	$rootScope.$on('updatedQueue', setQueue);
	$rootScope.$on('updatedPlaying', setNowPlaying);

});
