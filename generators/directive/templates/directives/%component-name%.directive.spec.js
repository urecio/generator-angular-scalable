'use strict';

/**
 * Karma unit tests.
 */


 describe('<%= componentName %> Directive', function(){

  var element,
      $scope;

  beforeEach(function(){
    module('<%= appName %>.<%= moduleName %>');

    inject(function($injector){
      // inject things here
    })
  });

  beforeEach(function(){
    element = createDirective('<div <%= directiveDasherizedName %>></div>');
    $scope = element.scope();
  });

  it('should do directive things', function () {
    // Test me
  });

});
