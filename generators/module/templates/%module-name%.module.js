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

  <% var includeControllerTemplate = typeof includeController !== 'undefined' && includeController === true ? true : false %>
  <% var includeViewTemplate = typeof includeView !== 'undefined' && includeView === true ? true : false %>

  function <%= moduleName %>(<%if (includeControllerTemplate === true || includeViewTemplate === true) { %> $stateProvider <% } %>) {

    <%if (!includeControllerTemplate && !includeViewTemplate) { %>
      /*
    <% } %>

    $stateProvider.state('<%= moduleName.toLowerCase() %>', {
      url: '/<%= moduleName %>',
    <%if (includeControllerTemplate === true) { %>  controller: '<%= moduleName %>Controller as <%= moduleName %>Controller', <% } %>
    <%if (includeViewTemplate === true) { %>  templateUrl: '<%= viewUrl %>',  <% } %>
    });

    <%if (!includeControllerTemplate && !includeViewTemplate) { %>
    */
    <% } %>

  }

  angular.module('<%= appName %>.<%= moduleName %>', [
    <%if (!includeControllerTemplate && !includeViewTemplate) { %>
      /*
    <% } %>
    'ui.router'
    <%if (!includeControllerTemplate && !includeViewTemplate) { %>
    */
    <% } %>
  ])
    .config(<%= moduleName %>);
})();
