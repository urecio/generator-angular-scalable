// TODO: run wiredep after the generator
// TODO: tests
// TODO: in the json server option, put back karma read json, etc

'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    utils.setGenerator(this); utils.welcome.call(this);

    var prompts = [];
    this.appName = this.config.get('appName');
    if(!this.appName) {
      prompts.push(utils.promptAppName);
    }
    prompts.push({
      type: 'confirm',
      name: 'includeBootstrap',
      message: 'Do you want to include bootstrap?',
      default: false
    });
    prompts.push({
      type: 'confirm',
      name: 'includeProtractor',
      message: 'Do you want to include protractor?',
      default: false
    });
    prompts.push({
      type: 'confirm',
      name: 'includeJsonServer',
      message: 'Do you want to include a mocks json server?',
      default: false
    });
    prompts.push({
      type: 'confirm',
      name: 'includeRestangular',
      message: 'Do you want to include restangular?',
      default: false
    });

    this.prompt(prompts, function (props) {
      this.props = props;
      if ( props.appName ) utils.saveAppName.call(this, this.props.appName);
      if ( props.includeProtractor ) this.config.set('includeProtractor', 'true');
      done();
    }.bind(this));
  },

  writing: function () {

    var filesToCopy = [
      this.templatePath('./main/**/!(*.png|*.jpg|*.jpeg|*.gif|*.webp|*.svg)')
    ];

    if ( !this.props.includeProtractor ) {
      filesToCopy.push('!'+this.templatePath('./main/test/e2e/**'));
      filesToCopy.push('!'+this.templatePath('./**/*.scenario.js'));
    }

    if ( !this.props.includeJsonServer ) {
      filesToCopy.push('!'+this.templatePath('./main/test/mocks/**'));
    }

    this.fs.copyTpl(
      filesToCopy,
      this.destinationPath('./'),
      {
        appName: this.appName || this.props.appName,
        includeBootstrap: this.props.includeBootstrap || false,
        includeProtractor: this.props.includeProtractor || false,
        includeJsonServer: this.props.includeJsonServer || false,
        includeRestangular: this.props.includeRestangular || false
      }
    );
    // copies .files like .gitignore
    this.fs.copy(
      this.templatePath('./main/**/.*'),
      this.destinationPath('./')
    );
    // copies images
    this.fs.copy(
      this.templatePath('./main/**/+(*.png|*.jpg|*.jpeg|*.gif|*.webp|*.svg)'),
      this.destinationPath('./')
    );

  },

  install: function () {
    this.installDependencies();
  }
});
