'use strict';

(function(){

  /**
   * @ngdoc service
   * @name  <%= componentName %>Factory
   * @description
   */
  function <%= componentName %>Factory() {
    return {
      foo: 'bar'
    }
  }

  angular.module('<%= appName %>.<%= moduleName %>')
    .factory('<%= componentName %>',<%= componentName %>Factory);

})();
