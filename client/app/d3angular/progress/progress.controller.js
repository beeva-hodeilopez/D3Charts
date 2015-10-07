'use strict';

angular.module('d3ChartsApp')
  .controller('ProgressCtrl', function ($scope) {
      $scope.item = {percent: '78', color: '#86C82D'};
      $scope.view = true;
      $scope.setView = function(view){
          $scope.view = view;
      }
  });
