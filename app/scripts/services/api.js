//this service contains all  service comminaction code
'use strict';

angular.module('nodeboxApp')
  .factory('Api', function($http) {
      return {
        search: function(searchTerm) {
          return $http.post('api/searchAll', {'searchTerm': searchTerm})
          .then(function(result) {
            return result.data;
          });
        },
        getQueue: function() {
          return $http.get('api/getQueue')
            .then(function(currentQueue) {
              return currentQueue.data;
            });
        }
      };
  });
