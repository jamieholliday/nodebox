'use strict';

angular.module('nodeboxApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main',
		controller: 'MainCtrl'
	})
	.when('/search', {
		templateUrl: 'partials/search',
		controller: 'SearchCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
  
	$locationProvider.html5Mode(true);
});