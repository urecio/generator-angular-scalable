'use strict';

/**
 * Karma unit tests.
 */
describe('<%= componentName %>Filter', function(){

  var <%= componentName %>filter;

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

  beforeEach(inject(function($injector) {
    <%= componentName %>filter = $filter('<%= componentName %>');
  }));

});
