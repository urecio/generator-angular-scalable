'use strict';

/**
 * Home module.
 * @ngdoc overview
 * @name Home
 * @description
 *
 * # Main module of the feature.
 */

(function() {

  function home($stateProvider) {

    $stateProvider
      .state('home', {
        url:'/',
        templateUrl: 'components/home/views/home.view.html',
      });
  }

  angular.module('<%= appName %>.home', [
    'ui.router'
  ]).config(home);
})();
