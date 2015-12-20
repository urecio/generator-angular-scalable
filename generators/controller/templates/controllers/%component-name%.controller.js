'use strict';

/**
 * <%= componentName %> controller.
 *
 * @ngdoc overview
 * @name  <%= componentName %>Controller
 * @description
 */
(function(){

  function <%= componentName %>Controller() {

    var self = this;

    this.foo = 'bar';

  }

  angular.module('<%= appName %>.<%= moduleName %>')
    .controller('<%= componentName %>Controller',<%= componentName %>Controller);
})();
