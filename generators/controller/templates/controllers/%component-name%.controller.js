'use strict';

/**
 * <%= componentName %> controller.
 *
 * @ngdoc overview
 * @name  <%= componentName %>Ctrl
 * @description
 */
(function(){

  function <%= componentName %>Ctrl() {

    var self = this;

    this.foo = 'bar';

  }

  angular.module('<%= appName %>.<%= moduleName %>')
    .controller('<%= componentName %>Ctrl',<%= componentName %>Ctrl);
})();
