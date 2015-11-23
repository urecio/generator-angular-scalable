'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    utils.welcome.call(this);

    var prompts = [];
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
      this.destinationPath('./'),
      {appName: this.props.appName}
    );
  },

  install: function () {
    this.installDependencies();
  }
});
