var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var glob = require('glob');
var _ = require('lodash');
var strUtils = require('./string-utils');
var base;
var contextData;

// TODO: generator arguments everywhere should be optional. A better way to handle this could be to have a "Global" variable

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

  calculateBase: function (generator) {
    return 'app/' + (generator.props.isCommon ? 'common/' : 'components/') + generator.props.moduleName;
  },
  createBasicContextData: function (generator) {
    return {appName: generator.config.get('appName'),
            moduleName: generator.props.moduleName,
            componentName: generator.props.componentName};
  },

  copyAndReplaceFileNames: function (generator, templatePath, destinationPath) {

    var self = this;

    contextData = contextData || this.createBasicContextData(generator);
    base = base || this.calculateBase(generator);

    generator.template (
      generator.templatePath(templatePath),
      generator.destinationPath(destinationPath || base),
      contextData
    ).on('end', function () {
      self.replaceCopiedFiles(generator, templatePath);
    });

  },

  replaceCopiedFiles: function (generator, templatePath) {
    glob.sync(generator.templatePath(templatePath)).forEach(function (file) {
      var lastUrlPart = file.substr(file.indexOf('templates') + 'templates'.length);
      var fileToReplace = generator.destinationPath(base) + lastUrlPart;
      // replaces fileName content inside %%
      var fileReplaced = fileToReplace.replace(/%.*%/g, function (a) {
        var toReplace = _.camelCase(a.substr(1, a.length - 2));
        return strUtils.dasherize(generator.config.get(toReplace) || generator.props[toReplace]);
      });
      fs.rename(fileToReplace, fileReplaced);
    });
  },

  subModuleWritting: function(generator, extraContextData) {

    var self = this;

    contextData = contextData || this.createBasicContextData(generator);
    base = base || this.calculateBase(generator);

    function copyTemplate(generator) {
      _.extend(contextData, extraContextData);
      self.copyAndReplaceFileNames(generator, '**/*', null);
    };

    //exec

    // if the module subgenerator is being runned, it's not needed to check if the path exists, because the main module files will be created anyways
    if(generator.templatePath().indexOf('module') !== -1) copyTemplate(generator);
    else {

      try {// if the path doesn't exists, it needs basic module configuration
        var fsBasePath = fs.lstatSync(base);
      } catch (err) {
        self.copyAndReplaceFileNames(generator, '../../module/templates/*', null);
      } finally {
        copyTemplate(generator);
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
