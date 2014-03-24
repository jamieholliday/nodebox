'use strict';

angular.module('nodeboxApp')
	.controller('MainCtrl', function ($scope, Queue) {

	$scope.tracks = Queue.get();
	$scope.noTracks = false;
	if($scope.tracks.length < 1) {
		$scope.noTracks = true;
	}
});
