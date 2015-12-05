// TODO: run wiredep after the generator
// TODO: add the possibility to include the main module on the app.module.js
// TODO: tests
// TODO: styles option per feature. Create block comments for the module, but on the header, for the styles
// TODO: check the home view + social links
// TODO: in the json server option, put back karma read json, etc

'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils.js');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    utils.welcome.call(this);

    var prompts = [];
    this.appName = this.config.get('appName');
    if(!this.appName) {
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
      this.templatePath('./main/**/*'),
      this.destinationPath('./'),
      {appName: this.appName || this.props.appName}
    );
  },

  install: function () {
    this.installDependencies();
  }
});
