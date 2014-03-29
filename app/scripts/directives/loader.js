'use strict';

angular.module('nodeboxApp')
	.directive('jhLoader', function() {
		return{
			restrict: 'E',
			template: '<div class="loader"><ul><li></li><li></li><li></li><ul></div>',
			transclude: true
		};
	});