'use strict';

angular.module('nodeboxApp')
	.controller('MainCtrl', function ($scope, Queue, Api, Socket) {

	Socket.on('init', function(data) {
		$scope.name = data.name;
		$scope.users = data.users;
		console.log(data);
	});

	Socket.on('server:updateQueue', function(currentQueue) {
		console.log(currentQueue);
		Queue.update(currentQueue);
		$scope.tracks = Queue.get();
		$scope.$apply();
	});

	Socket.on('server:NowPlaying', function(nowPlaying) {
		console.log(nowPlaying);
		Queue.setNowPlaying(nowPlaying);
	});

	var setQueue = function() {
		$scope.tracks = Queue.get();
		if($scope.tracks.length < 1) {
			$scope.noTracks = true;
		}
		$scope.nowPlaying = Queue.getNowPlaying();
	};

	$scope.tracks = Queue.get();
	$scope.noTracks = false;

	//get the current queue if there is one
	if(!$scope.tracks.length) {
		Api.getQueue().then(function(currentQueue) {
			Queue.update(currentQueue);
			console.log(currentQueue);
			setQueue();
		});
	} else {
		setQueue();
	}

	$scope.$on('$destroy', function (event) {
			Socket.removeAllListeners('server:updateQueue');
			Socket.removeAllListeners('server:NowPlaying');
	});

});
