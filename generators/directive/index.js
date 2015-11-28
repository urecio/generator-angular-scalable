'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils.js');
var strUtils = require('../string-utils');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    utils.welcome.call(this);

    var prompts = utils.createBasicSubPrompts.call(this);

    this.prompt(prompts, function (props) {
      this.props = props;
      if(props.appName) utils.saveAppName.call(this, props.appName);
      done();
    }.bind(this));
  },

  writing: function () {
    var extraContextData = {directiveDasherizedName: strUtils.dasherize(this.props.componentName)};
    utils.subModuleWritting(this, extraContextData);
  }
});
