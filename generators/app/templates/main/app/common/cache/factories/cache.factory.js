'use strict';

(function() {

  /**
   * @ngdoc service
   * @name  Cache
   * @requires  angular-data.DSCacheFactory
   * @description
   */
  function CacheFactory(DSCacheFactory) {
    var dataCache = new DSCacheFactory('data');

    return {
      Data:{
        set: function(key, value) {
          dataCache.put(key, angular.copy(value));
        },
        get: function(key) {
          return (dataCache.get(key)) ? angular.copy(dataCache.get(key)) : null;
        },
        delete: function(key) {
          dataCache.remove(key);
        }
      }
    };
  }

  angular.module('<%= appName %>.cache')
    .factory('Cache', CacheFactory);

})();
