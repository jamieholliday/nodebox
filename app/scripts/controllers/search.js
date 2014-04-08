'use strict';

angular.module('nodeboxApp')
	.controller('SearchCtrl', function ($scope, Queue, Api) {
		$scope.showSearchFooter = false;
		$scope.showLoader = false;

		$scope.setSearchData = function() {
			//check if there is data from previous search
			var searchResults = Queue.getSearchResults();
			if(searchResults) {
				$scope.tracks = searchResults.tracks[0].track;
				$scope.artists = searchResults.artists[0].artist;
				$scope.albums = searchResults.albums[0].album;
			}
		};

		$scope.clearSearchData = function() {
			$scope.tracks = [];
			$scope.artists = [];
			$scope.albums = [];
			Queue.clear();
		};

		$scope.search = function() {
			if($scope.searchTerm) {
				$scope.showLoader = true;
				$scope.clearSearchData();
				Api.search($scope.searchTerm).then(function(data) {
					Queue.setSearchResults(data);
					$scope.setSearchData();
					$scope.showLoader = false;
				});
			}
		};

		$scope.addButtonClicked = function(track) {
			this.toogleSearchFooter();
			$scope.selectedTrack = track;
		};

		$scope.addToQueueClicked = function() {
			if($scope.selectedTrack) {
				Queue.add($scope.selectedTrack);
			}
			this.toogleSearchFooter();
		};

		$scope.cancelSearchClicked = function() {
			this.toogleSearchFooter();
		};

		$scope.toogleSearchFooter = function() {
			$scope.showSearchFooter = !$scope.showSearchFooter;
		};

		$scope.setSearchData();
});
