'use strict';

angular.module('d3ChartsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('angular/progress', {
        url: '/angular/progress',
        templateUrl: 'app/d3angular/progress/progress.html',
        controller: 'ProgressCtrl'
      });
  });
