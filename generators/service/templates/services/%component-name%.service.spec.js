'use strict';

/**
 * Karma unit tests.
 */
describe('<%= componentName %>Service', function(){

  var <%= componentName %>service;

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

  beforeEach(inject(function($injector) {
    service = $injector.get('<%= componentName %>');
  }));

});
