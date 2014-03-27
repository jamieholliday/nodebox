'use strict';

angular.module('nodeboxApp')
	.controller('SearchCtrl', function ($scope, $http, Queue) {
		$scope.showSearchFooter = false;
		
		$scope.setSearchData = function() {
			//check if there is data from previous search
			if(Queue.searchResults.result) {
				$scope.tracks = Queue.searchResults.result.tracks[0].track;
				$scope.artists = Queue.searchResults.result.artists[0].artist;
				$scope.albums = Queue.searchResults.result.albums[0].album;
			}
		};

		$scope.setSearchData();

		$scope.search = function() {
			$http.post('api/searchAll', {'searchTerm': $scope.searchTerm})
			.success(function(data, status) {
				Queue.searchResults = data;
				$scope.status = status;
				$scope.setSearchData();
			})
			.error(function(data, status) {
				$scope.data = data || 'Sorry couldn\'t get \'owt';
				$scope.status = status;
			});
		};

		$scope.addButtonClicked = function(track) {
			this.toogleSearchFooter();
			$scope.selectedtrack = track;
		};

		$scope.addToQueueClicked = function() {
			if(this.selectedtrack) {
				Queue.add(this.selectedtrack);
			}
			this.toogleSearchFooter();
		};

		$scope.cancelSearchClicked = function() {
			this.toogleSearchFooter();
		};

		$scope.toogleSearchFooter = function() {
			$scope.showSearchFooter = !$scope.showSearchFooter;
		};
});

