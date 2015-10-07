'use strict';

angular.module('d3ChartsApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.goToLink = function(type){
      if(type === "progress"){
        $location.path('/angular/progress');
      }
    }

  });
