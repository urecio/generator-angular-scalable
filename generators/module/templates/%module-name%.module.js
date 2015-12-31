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

  function <%= moduleName %>(<%if (includeController === true || includeView === true) { %> $stateProvider <% } %>) {

    <%if (!includeController && !includeView) { %>
      /*
    <% } %>

    $stateProvider.state('<%= moduleName.toLowerCase() %>', {
      url: '/<%= moduleName %>',
    <%if (includeController === true) { %>  controller: '<%= moduleName %>Controller as <%= moduleName %>Controller', <% } %>
    <%if (includeView === true) { %>  templateUrl: '<%= viewUrl %>',  <% } %>
    });

    <%if (!includeController && !includeView) { %>
    */
    <% } %>

  }

  angular.module('<%= appName %>.<%= moduleName %>', [])
    .config(<%= moduleName %>);
})();
