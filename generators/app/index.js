'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

// TODO: finish package json (including app name on the file, author, licese and repositoryUrl)
// TODO: include a bower file
// TODO: include a gruntfile. See http://yeoman.io/authoring/gruntfile.html
// TODO: finish bootstrap inclusion on the other files + dependency. http://yeoman.io/authoring/dependencies.html
// TODO: allow arguments, etc
// TODO: ask for an optional repositoryUrl
// TODO: put in the readme that it's translations ready + json server to mock + integration tests
// TODO: also readme. Explain that inside the styleguide-only the scss won't get included on the main.css
// TODO: remove aws from gruntfile
// TODO: Figure out how the user could configure travis and put that in the docs
// TODO: translations: remove veruscript file and leave it blank
// TODO: remove any veruscript/daad trace

    // Have Yeoman greet the user.
    utils.welcome.call(this);

    var prompts = [{
      type: 'confirm',
      name: 'bootstrap',
      message: 'Do you want to include bootstrap-sass?',
      default: true
    }];
    if(!this.config.get('appName')) {
      prompts.push(utils.promptAppName);
    }

    this.prompt(prompts, function (props) {
      this.props = props;
      if(props.appName) utils.saveAppName.call(this, this.props.appName);
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('./**/*'),
      this.destinationPath('./')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
