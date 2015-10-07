'use strict';

angular.module('d3ChartsApp')
  .service('Config', function ($rootScope,$log) {
      var config = {
        startApp : function() {
          $log.info('Visualización de datos');
          $rootScope.Config       = config;
        },
        resizeWindow: function(){
          $rootScope.$broadcast('resizeWindow');
        }
      };

      return config;
  });
