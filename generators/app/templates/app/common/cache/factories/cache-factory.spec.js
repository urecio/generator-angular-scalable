'use strict';

/**
 * Karma unit tests.
 */
describe('CacheFactory', function() {

  var cache;

  beforeEach(module('<%= appName %>cache'));

  beforeEach(inject(function($injector) {
    cache = $injector.get('Cache');
  }));

  var data = readJSON('test/mocks/data.json');

  describe('Data Cache', function() {

    it('should set and get a data', function() {
      cache.Data.set('universities', data.universities);

      expect(cache.Data.get('universities')).toEqual(data.universities);
    });

    it('should remove the data', function() {
      cache.Data.delete('universities');

      expect(cache.Data.get('universities')).toBeNull();
    });

  });

});
