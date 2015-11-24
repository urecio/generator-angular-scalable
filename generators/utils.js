var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var glob = require('glob');
var _ = require('lodash');

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


  subModuleWritting: function(extraContextData) {

    var contextData = {appName: this.config.get('appName'),
                      moduleName: this.props.moduleName,
                      componentName: this.props.componentName};

    var base = (this.props.isCommon ? 'common/' : 'components/') + this.props.moduleName;

    function replaceCopiedFiles (generator, templatePath) {
      glob.sync(generator.templatePath(templatePath)).forEach(function (file) {
        var lastUrlPart = file.substr(file.indexOf('templates') + 'templates'.length);
        var fileToReplace = generator.destinationPath(base) + lastUrlPart;
        var fileReplaced = fileToReplace.replace(/%.*%/g, function (a,b,c) {
          var varFromMatch = _.camelCase(a.substr(1, a.length - 2));
          return generator.config.get(varFromMatch) || generator.props[varFromMatch];
        });
        fs.rename(fileToReplace, fileReplaced);
      });
    }

    function copyAndReplaceFileNames(generator, templatePath, destinationPath) {
      generator.template (
        generator.templatePath(templatePath),
        generator.destinationPath(destinationPath || base),
        contextData
      ).on('end', function () {
        replaceCopiedFiles(generator, templatePath);
      });
    }

    function copyTemplate(generator) {
      _.extend(contextData, extraContextData);
      copyAndReplaceFileNames(generator, '**/*', null);
    };



    //exec

    // if the module subgenerator is being runned, it's not needed to check if the path exists, because the main module files will be created anyways
    if(this.templatePath().indexOf('modules') !== -1) copyTemplate(this);
    else {

      try {// if the path doesn't exists, it needs basic module configuration
        var fsBasePath = fs.lstatSync(base);
      } catch (err) {
        copyAndReplaceFileNames(this, '../../module/templates/*', null);
      } finally {
        copyTemplate(this);
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
    {
      type: 'string',
      name: 'componentName',
      message: 'What\'s the name of this component?',
      optional: false,
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
