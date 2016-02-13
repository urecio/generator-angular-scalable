'use strict';

/**
 * Karma unit tests.
 */
describe('<%= componentName %>Factory', function(){

  var <%=componentName%>factory;

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

  beforeEach(inject(function($injector) {
    <%= componentName %>factory = $injector.get('<%= componentName %>');
  }));

});
