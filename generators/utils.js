var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var escodegen = require('escodegen');
var glob = require('glob');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var strUtils = require('./string-utils');

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

  // this var has de purpose of persist data during the execution of several generators in a row
  // For example the module generator, executes controller and view before and would need their routes on its template
  contextData: {},
  base: undefined,

  welcome: function() {
    this.log(yosay(
      'Welcome to the jungle and have fun with the ' + chalk.red('generator-angular-scalable') + ' generator!'
    ));
  },

  setGenerator: function (generator) {
    this.generator = generator;
  },

  generateStyles: function () {
    var foldersToCreate = ['styles/auto-imports'];
    this.copyAndReplaceFileNames('../../stylesheet/templates/**/*', null, foldersToCreate);
    this.updateIncludeSourceGrunt();
  },

  updateIncludeSourceGrunt: function () {
    // gets the last style file name edited
    var styleFileName = this.lastFileNamesEdited.filter(function (a) {return a.indexOf('scss') !== -1})[0];
    styleFileName = styleFileName.substring(styleFileName.indexOf('app'));

    // get the variable
    var gruntTree = this.generator.gruntfile.gruntfile;

    // if doesn't exist, create it
    if(gruntTree.var("includeSourceFiles").value().length === 0) gruntTree.body.append('var includeSourceFiles = {}');

    // write the variable in the tree with the new style path
    var includeSourceFiles = gruntTree.var("includeSourceFiles").value();
    // style path to variable
    includeSourceFiles.key("'"+styleFileName+"'").value('"'+styleFileName+'"');
    // insert the variable content
    this.generator.gruntfile.insertVariable("includeSourceFiles", escodegen.generate(includeSourceFiles.node));

    // write the gruntfile
    fs.writeFileSync('Gruntfile.js', this.generator.gruntfile.toString());
  },

  calculateBase: function () {
    return 'app/' + (this.generator.props.isCommon ? 'common/' : 'components/') + strUtils.dasherize(this.generator.props.moduleName);
  },


  createBasicContextData: function () {
    var self = this;
    return {appName: self.generator.config.get('appName'),
            moduleName: self.generator.props.moduleName,
            componentName: self.generator.props.componentName};
  },



  copyAndReplaceFileNames: function (templatePath, destinationPath, foldersToCreate, extraContextData) {

    var self = this;
    var filesAndNewNameToReplace;

    // paths calculation
    this.base = this.base || this.calculateBase();
    filesAndNewNameToReplace = this.getFilesWithNewNamesAndUpdateContext(templatePath);
    destinationPath = this.generator.destinationPath(destinationPath || this.base);

    // context data
    contextData = this.createBasicContextData();
    _.extend(contextData, extraContextData);

    // viewUrl
    if( !this.contextData.viewUrl ) {
      this.contextData.viewUrl = filesAndNewNameToReplace.filter(function(a){return a.to.indexOf('view.html') !== -1})[0];
      if( this.contextData.viewUrl ) this.contextData.viewUrl = this.contextData.viewUrl.to.substring(this.contextData.viewUrl.to.indexOf('app') + 4);
    } else contextData.viewUrl = this.contextData.viewUrl;

    // template generation
    this.generator.template (
      this.generator.templatePath(templatePath),
      destinationPath,
      contextData
    ).on('end', function () {
      self.replaceFileNames(filesAndNewNameToReplace);
    });

    // folder creation
    if ( foldersToCreate ) foldersToCreate.forEach(function (folder) { mkdirp.sync(destinationPath + '/' + folder); });

    // updates context
    this.lastWrittenFolder = destinationPath;

    return destinationPath;

  },

  replaceFileNames: function (filesAndNewName) {
    filesAndNewName.forEach(function (file) {
      fs.rename(file.from, file.to);
    });
  },

  getFilesWithNewNamesAndUpdateContext: function (templatePath) {
    var self = this;
    this.lastFileNamesEdited = [];
    var filesAndNewName = [];

    glob.sync(this.generator.templatePath(templatePath)).forEach(function (file) {
      var lastUrlPart = file.substr(file.indexOf('templates') + 'templates'.length);
      var fileToReplace = self.generator.destinationPath(self.base) + lastUrlPart;
      // replaces fileName content inside %%
      var fileReplaced = fileToReplace.replace(/%.*%/g, function (a) {
        var toReplace = _.camelCase(a.substr(1, a.length - 2));
        return strUtils.dasherize(self.generator.config.get(toReplace) || self.generator.props[toReplace]);
      });
      filesAndNewName.push({from: fileToReplace, to: fileReplaced});
      // updates context
      self.lastFileNamesEdited.push(fileReplaced);
    });

    return filesAndNewName;
  },

  replaceCopiedFiles: function (templatePath) {
    this.replaceFileNames(this.getFilesWithNewNamesAndUpdateContext(templatePath));
  },

  subModuleWritting: function(extraContextData, foldersToCreate) {

    var self = this;
    var destinationPath;

    contextData = this.createBasicContextData();
    this.base = this.base || this.calculateBase();

    function copyTemplate() {
      _.extend(contextData, extraContextData);
      return self.copyAndReplaceFileNames('**/*', null, foldersToCreate, contextData);
    };

    //exec

    // if the module subgenerator is being runned, it's not needed to check if the path exists, because the main module files will be created anyways
    if(this.generator.templatePath().indexOf('module') !== -1) copyTemplate(this.generator);
    else {

      try {// if the path doesn't exists, it needs basic module configuration
        var fsBasePath = fs.lstatSync(this.base);
      } catch (err) {
        destinationPath = self.copyAndReplaceFileNames('../../module/templates/*', null, foldersToCreate);
      } finally {
        destinationPath = copyTemplate(this.generator);
      }

    }

    return destinationPath;

  },


  createBasicSubPrompts: function () {
    var prompts = [];
    if (!this.props || !this.props.isCommon) {
      prompts.push({
        type: 'confirm',
        name: 'isCommon',
        message: 'Is it a common module?',
        default: false
      });
    }
    if (!this.props || !this.props.componentName) {
      prompts.push({
        type: 'string',
        name: 'componentName',
        message: 'What\'s the name of this component?',
        optional: false,
      });
    }
    if (!this.props || !this.props.moduleName) prompts.push(promptModuleName);

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
