'use strict';
/**
 * @ngdoc overview
 * @name <%= appName %>
 * @description
 * @requires $urlRouterProvider
 * @requires $locationProvider
 *
 * Main module of the application.
 */
angular
.module('<%= appName %>', [
  'ngSanitize',

  /* COMMONS */
  '<%= appName %>.cache',
  /* END COMMONS */

  /* COMPONENTS */
  '<%= appName %>.home',
  /* END COMPONENTS */
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    moment().locale('en');
  });
