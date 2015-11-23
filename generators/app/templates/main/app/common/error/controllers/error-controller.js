'use strict';

/**
 * Error controller.
 *
 * @ngdoc overview
 * @name  ErrorCtrl
 * @description
 */
(function() {

  function ErrorCtrl($scope, $stateParams) {
    angular.extend($scope, $stateParams);
  }

  angular.module('<%= appName %>error')
    .controller('ErrorCtrl', ErrorCtrl);
})();
