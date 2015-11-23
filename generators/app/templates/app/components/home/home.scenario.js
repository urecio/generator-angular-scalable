'use strict';

/**
 * Protractor e2e tests.
 */
describe('home', function() {

  var home = require('./home.pageobject.js');

  beforeEach(function() {
    home.navigate();
  });

});
