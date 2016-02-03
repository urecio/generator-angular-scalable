'use strict';

/**
 * Karma unit tests.
 */
describe('<%= componentName %>Controller', function(){

  var <%= componentName %>Controller;

  beforeEach(module('<%= appName %>.<%= moduleName %>'));

  beforeEach(inject(function(_$rootScope_, _$controller_) {

    <%= componentName %>Controller = _$controller_('<%= componentName %>Controller', {
      $scope: _$rootScope_.$new()
    });

  }));

});
