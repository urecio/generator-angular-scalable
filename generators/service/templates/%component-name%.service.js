'use strict';

(function(){

  /**
   * @ngdoc service
   * @name  <%= componentName %>Service
   * @description
   */
  function <%= componentName %>Service() {
    this.foo = 'bar';
  }

  angular.module('<%= appName %>.<%= moduleName %>')
    .service('<%= componentName %>',<%= componentName %>Service);
})();
