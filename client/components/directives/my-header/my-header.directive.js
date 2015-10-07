'use strict';

angular.module('d3ChartsApp')
  .directive('myHeader', function ($location) {
    return {
      templateUrl: 'components/directives/my-header/my-header.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.goToLink=function(path){
          $location.path(path);
        }
      }
    };
  });
