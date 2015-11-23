'use strict';

/**
 * Error module.
 * @ngdoc overview
 * @name Error
 * @description
 *
 * # Main module of the feature.
 */

(function() {

  function error($stateProvider, $provide, environment) {

    $stateProvider.state('error', {
      url: '/error',
      templateUrl: 'common/error/views/error-view.html'
    }).state('error.404', {
      params:{
        unFoundState:null,
        fromState:null
      },
      url:'/404',
      templateUrl: 'common/error/views/error-404-view.html',
      controller:'ErrorCtrl'
    }).state('error.500', {
      params:{
        fromState:null,
        toState:null,
        error:null
      },
      url:'/500',
      templateUrl: 'common/error/views/error-500-view.html',
      controller:'ErrorCtrl'
    });

    $provide.decorator('$exceptionHandler', ['$delegate', function($delegate) {
      return function(exception, cause) {
        if (environment === 'beta' || environment === 'production') {
          Raygun.send(exception);
        }
        $delegate(exception, cause);
      };
    }]);
  }

  function errorInit($rootScope, $state, environment) {
    $rootScope.$on('$stateNotFound', function(event, unFoundState, fromState) {
      $state.go('error.404', {
        fromState: fromState,
        unFoundState:unFoundState
      });
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      $state.go('error.500', {
        fromState: fromState,
        toState:toState,
        error:error
      });
    });
    if (environment === 'beta' || environment === 'production') {
      Raygun.init('Oqro+zWO7wpAmKs9bMLj+w==').attach();
    }
  }

  angular.module('<%= appName %>.error', [
    'ui.router',
    '<%= appName %>.env'
  ])
    .config(error)
    .run(errorInit);
})();
