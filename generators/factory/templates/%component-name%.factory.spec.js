'use strict';

/**
 * Karma unit tests.
 */
describe('<%= classedName %>Factory', function(){

  var <%=classedName%>factory;

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

  beforeEach(inject(function($injector) {
    <%= componentName %>factory = $injector.get('<%= componentName %>');
  }));

});
