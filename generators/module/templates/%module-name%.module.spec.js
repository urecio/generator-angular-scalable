'use strict';

/**
 * Karma unit tests.
 */
describe('<%= moduleName %> module', function () {

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

   var $httpBackend,
       <%= moduleName %>sState;

   beforeEach(function () {
     inject(function($injector) {
      // injects
     });
   });

  it('should be tested', function() {
    // test me
  });

});
