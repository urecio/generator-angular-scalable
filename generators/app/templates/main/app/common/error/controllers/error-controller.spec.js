'use strict';

/**
 * Karma unit tests.
 */
describe('ErrorCtrl', function(){

  var ctrl;
  var scope;
  var stateParams = {
    state:'error'
  };

  beforeEach(module('<%= appName %>error'));

  beforeEach(inject(function($injector) {

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    scope = $rootScope.$new();

    ctrl = $controller('ErrorCtrl', {
      $scope: scope,
      $stateParams:stateParams
    });
  }));

  it('should extend the controller scope with the stateParams', function() {
    expect(scope.state).toEqual(stateParams.state);
  });

});
