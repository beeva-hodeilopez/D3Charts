'use strict';

angular.module('d3ChartsApp')
  .directive('resize', function ($window,Config) {
    return {
      restrict: 'EA',
      link: function (scope/*, element, attrs*/) {
        angular.element($window).on('resize', function(/*e*/) {
          Config.resizeWindow();
        });
      }
    };
  });
