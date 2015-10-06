'use strict';

angular.module('d3ChartsApp')
  .directive('myHeader', function () {
    return {
      templateUrl: 'components/directives/my-header/my-header.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });