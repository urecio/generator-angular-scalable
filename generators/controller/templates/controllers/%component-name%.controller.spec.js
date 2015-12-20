'use strict';

/**
 * Karma unit tests.
 */
describe('<%= componentName %>Controller', function(){

  var Controller;

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

  beforeEach(inject(function($injector) {

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    Controller = $controller('<%= componentName %>Controller', {
      $scope: $rootScope.$new()
    });
  }));

});
