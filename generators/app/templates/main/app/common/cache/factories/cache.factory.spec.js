'use strict';

/**
 * Karma unit tests.
 */
describe('CacheFactory', function() {

  var cache,
      userMock = {name: 'paco'};

  beforeEach(module('<%= appName %>.cache'));

  beforeEach(inject(function($injector) {
    cache = $injector.get('Cache');
  }));

  describe('Data Cache', function() {

    it('should set and get a data', function() {
      // exec
      cache.Data.set('user', userMock);
      // assert
      expect(cache.Data.get('user')).toEqual(userMock);
    });

    it('should remove the data', function() {
      // exec
      cache.Data.delete('user');
      // assert
      expect(cache.Data.get('user')).toBeNull();
    });

  });

});
