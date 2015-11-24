'use strict';

/**
 * Karma unit tests.
 */
describe('<%= componentName %>Ctrl', function(){

  var ctrl;

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

  beforeEach(inject(function($injector) {

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    ctrl = $controller('<%= componentName %>Ctrl', {
      $scope: $rootScope.$new()
    });
  }));

});
