'use strict';

(function(){

  /**
   * <%= componentName %> Filter.
   *
   * @ngdoc filter
   * @name  <%= componentName %>Filter
   */
  function <%= componentName %>Filter() {

    return function (input) {
      return '<%= componentName %> filter: ' + input;
    };

  }

  angular.module('<%= appName %>.<%= moduleName %>')
    .filter('<%= componentName %>',<%= classedName %>Filter);

})();
