'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
// TODO: after the module creation, include it on the app.js
    // Have Yeoman greet the user.
    utils.welcome.call(this);

    var prompts = [utils.promptModuleName];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    utils.subModuleWritting.apply(this);
  }
});
