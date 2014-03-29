'use strict';

angular.module('nodeboxApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location) {
    $scope.menu = [
	    {
			'title': 'search',
			'link': 'search',
			'icon': 'glyphicon-search'
		},
		{
			'title': 'playlist',
			'link': '/',
			'icon': 'glyphicon-th-list'
		}];

	$rootScope.$on('addedToQueue', function(evt, song) {
		$scope.added = song.title[0];
	});
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
