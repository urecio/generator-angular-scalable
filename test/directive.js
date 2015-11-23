'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-scalable:directive', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/directive'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
