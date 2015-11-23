'use strict';

/**
 * Karma unit tests.
 */
describe('ErrorModule', function() {

  beforeEach(function() {
    spyOn(Raygun, 'attach');
  });

  describe('Dev environment', function() {

    beforeEach(module('<%= appName %>.error', function($exceptionHandlerProvider) {
      $exceptionHandlerProvider.mode('log');
    }));

    var httpBackend;
    var rootScope;
    var state;
    var exceptionHandler;
    var timeout;
    var log;

    beforeEach(inject(function($injector) {
      httpBackend = $injector.get('$httpBackend');
      state = $injector.get('$state');
      rootScope = $injector.get('$rootScope');
      exceptionHandler = $injector.get('$exceptionHandler');
      timeout = $injector.get('$timeout');
      log = $injector.get('$log');
    }));

    it('should go the 404 page', function() {
      httpBackend.whenGET(/.*.html/).respond(200);
      httpBackend.expectGET(/.*.html/);
      spyOn(state, 'go');
      rootScope.$emit('$stateNotFound');
      rootScope.$digest();
      expect(state.go).toHaveBeenCalledWith('error.404', jasmine.any(Object));
    });

    it('should go the 500 page', function() {
      httpBackend.whenGET(/.*.html/).respond(200);
      httpBackend.expectGET(/.*.html/);
      spyOn(state, 'go');
      rootScope.$emit('$stateChangeError');
      rootScope.$digest();
      expect(state.go).toHaveBeenCalledWith('error.500', jasmine.any(Object));
    });

    it('Should not send the error to Raygun', function() {

      spyOn(Raygun, 'send');

      timeout(function() {
        throw new Error('banana peel');
      });
      timeout.flush();

      expect(Raygun.send).not.toHaveBeenCalled();
    });

  });

  describe('Production environment', function() {

    var timeout;

    beforeEach(module('<%= appName %>.env', function($provide) {
      $provide.constant('environment', 'production');
    }));

    beforeEach(module('<%= appName %>.error', function($exceptionHandlerProvider) {
      $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(inject(function($injector) {
      timeout = $injector.get('$timeout');
    }));

    it('should initiate the module', function() {
      expect(Raygun.attach).toHaveBeenCalled();
    });
    
  });
});
