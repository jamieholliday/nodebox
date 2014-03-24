'use strict';

angular.module('nodeboxApp')
	.controller('SearchCtrl', function ($scope, $http, Queue) {
		$scope.showSearchFooter = false;
		$scope.tracks = [
			{
				title: ['title1'],
				artist: ['artist1'],
				album: ['album1']
			},
			{
				title: ['title2'],
				artist: ['artist2'],
				album: ['album1']
			},
			{
				title: ['title3'],
				artist: ['artist3'],
				album: ['album1']
			}
		];

		$scope.artists = [
			{
				name: ['name1'],
			},
			{
				name: ['name2'],
			},
			{
				name: ['name3'],
			}
		];

		$scope.albums = [
			{
				name: ['name1'],
				'artist-name': ['artist-name1']
			},
			{
				name: ['name2'],
				'artist-name': ['artist-name2']
			},
			{
				name: ['name3'],
				'artist-name': ['artist-name3']
			}
		];

		$scope.search = function() {
			$http.post('api/searchAll', {'searchTerm': $scope.searchTerm})
			.success(function(data, status) {
				$scope.status = status;
				$scope.tracks = data.result.tracks[0].track;
				$scope.artists = data.result.artists[0].artist;
				$scope.albums = data.result.albums[0].album;

				$scope.result = data;
				console.log(data.result.albums[0].album);
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

