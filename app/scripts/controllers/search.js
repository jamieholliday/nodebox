'use strict';

angular.module('nodeboxApp')
	.controller('SearchCtrl', function ($scope, $http) {
		$scope.search = function() {
			$http.post('api/searchAll', {'searchTerm': $scope.searchTerm})
			.success(function(data, status) {
				$scope.status = status;
				$scope.result = data;
			})
			.error(function(data, status) {
				$scope.data = data || 'Sorry couldn\'t get \'owt';
				$scope.status = status;
			});
		};
});