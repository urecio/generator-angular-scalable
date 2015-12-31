'use strict';

/**
 * Karma unit tests.
 */
describe('<%= componentName %>Filter', function(){

  var <%= componentName %>filter;

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

  beforeEach(inject(function($injector) {
    var $filter = $injector.get('$filter');
    <%= componentName %>filter = $filter('<%= componentName %>');
  }));

});
