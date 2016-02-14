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

    this.prompt(prompts, function (props) {
      this.props = props;
      if(props.appName) utils.saveAppName.call(this, this.props.appName);
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('./main/**/!(*.png|*.jpg|*.jpeg|*.gif|*.webp|*.svg)'),
      this.destinationPath('./'),
      { appName: this.appName || this.props.appName,
        includeBootstrap: this.props.includeBootstrap || false}
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
