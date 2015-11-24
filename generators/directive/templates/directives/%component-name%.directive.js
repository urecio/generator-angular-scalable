'use strict';

/**
 * <%= componentName %> Directive.
 *
 * @ngdoc overview
 * @name  <%= moduleName %>.directive:<%= componentName %>
 * @description
 */

(function(){

  function <%= componentName %>Directive() {

    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
      //template: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      // link: function($scope, iElm, iAttrs, controller) {}
    };

  }

  angular.module('<%= appName %>.<%= moduleName %>')
    .directive('<%= componentName %>',<%= componentName %>Directive);
})();
