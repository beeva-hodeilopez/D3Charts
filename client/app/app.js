'use strict';

angular.module('d3ChartsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMaterial',
  'ui.router',
  'duScroll',
  'ui.bootstrap',
  'hljs'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);


  })
  .run(function (Config) {
    Config.startApp();
  });
