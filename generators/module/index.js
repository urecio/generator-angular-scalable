'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    utils.welcome.call(this);

    var prompts = utils.createBasicSubPrompts.call(this);
    prompts.push({
      type: 'confirm',
      name: 'includeStyle',
      message: 'Do you want to include a style template?',
      default: false
    });

    this.prompt(prompts, function (props) {
      this.props = props;
      if(props.appName) utils.saveAppName.call(this, props.appName);
      if(props.includeStyle) {
        console.log('copy and replace stylesheets');
        utils.copyAndReplaceFileNames(this, '../../stylesheet/templates/**/*', null);
      }
      done();
    }.bind(this));
  },

  writing: function () {
    utils.subModuleWritting(this);
  }
});
