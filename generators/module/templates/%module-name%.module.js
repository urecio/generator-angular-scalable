'use strict';

/**
 * <%= moduleName %> module.
 * @ngdoc overview
 * @name <%= moduleName %>
 * @description
 *
 * # Main module of the feature.
 */


(function(){

  function <%= moduleName %>() {

    // $stateProvider.state('<%= moduleName %>', {
    //   url: '/<%= moduleName %>',
    // });

  }

  angular.module('<%= appName %>.<%= moduleName %>', [])
    .config(<%= moduleName %>);
})();
