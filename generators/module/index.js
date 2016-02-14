'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    utils.setGenerator(this);
    utils.welcome.call(this);

    var prompts = [];

    prompts.push({
      type: 'confirm',
      name: 'isCommon',
      message: 'Is it a common module?',
      default: false,
      when: function (props) {
        return typeof props.isCommon === 'undefined';
      }
    });
    prompts.push(utils.promptModuleName);
    prompts.push({
      type: 'confirm',
      name: 'includeStyle',
      message: 'Do you want to include a style template?',
      default: false
    });
    prompts.push({
      type: 'confirm',
      name: 'includeController',
      message: 'Do you want to include a controller?',
      default: false
    });
    prompts.push({
      type: 'confirm',
      name: 'includeView',
      message: 'Do you want to include a view?',
      default: false
    });


    this.prompt(prompts, function (props) {
      this.props = props;
      if(props.appName) utils.saveAppName.call(this, props.appName);
      if( props.includeStyle ) utils.generateStyles();
      if( props.includeController || props.includeView ) {
        this.props.componentName = this.props.moduleName;
        if(props.includeController) utils.copyAndReplaceFileNames('../../controller/templates/**/*');
        if(props.includeView) utils.copyAndReplaceFileNames('../../view/templates/**/*');
      }
      utils.includeModuleInApp();
      done();
    }.bind(this));
  },

  writing: function () {
    var extraContextData = {
      includeView: this.props.includeView,
      includeController: this.props.includeController
    };
    utils.subModuleWritting(extraContextData);
  }
});
