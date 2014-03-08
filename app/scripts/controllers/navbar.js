'use strict';

angular.module('nodeboxApp')
  .controller('NavbarCtrl', function ($scope, $location) {
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
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
