var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

promptModuleName = {
  type: 'string',
  name: 'moduleName',
  optional: false,
  message: 'What\'s the module\'s name?'
};
promptAppName = {
  type: 'string',
  name: 'appName',
  optional: false,
  message: 'What\'s the app\'s name?'
};

module.exports = {
  welcome: function() {
    this.log(yosay(
      'Welcome to the jungle and have fun with the ' + chalk.red('generator-angular-scalable') + ' generator!'
    ));
  },
  subModuleWritting: function(){

    function copyTemplate() {
      this.fs.copyTpl(
        this.templatePath('**/*'),
        this.destinationPath(base)
      );
    };

    var base = (this.props.isCommon ? 'common/' : 'components/') + this.props.moduleName + '/';

    // if the module subgenerator is being runned, it's not needed to check if the path exists, because the main module files will be created anyways
    if(this.templatePath().indexOf('modules') !== -1) copyTemplate.call(this);
    else {

      try {// if the path doesn't exists, it needs basic module configuration
        var fsBasePath = fs.lstatSync(base);
      } catch (err) {
        this.fs.copyTpl(
          this.templatePath('../../module/*'),
          this.destinationPath(base)
        );
      } finally {
        copyTemplate.call(this);
      }

    }
  },
  createBasicSubPrompts: function () {
    var prompts = [{
      type: 'confirm',
      name: 'isCommon',
      message: 'Is it a common module?',
      default: false
    },
    promptModuleName];

    if(!this.config.get('appName')) {
      prompts.unshift(promptAppName);
    }

    return prompts;
  },
  saveAppName: function(appName) {
    this.config.set('appName', appName);
  },
  promptModuleName: promptModuleName,
  promptAppName: promptAppName
};
