// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
'use strict';
// Generated on 2014-07-01 using
// generator-karma 0.8.2

module.exports = function(config) {
  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    reporters: ['nyan', 'coverage', 'html'],

    // the default configuration
    htmlReporter: {
      outputDir: 'test/html_output', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false // simply replaces spaces with _ for files/dirs
    },

    //coverage reporter type
    coverageReporter: {
            type : 'html',
            dir  : 'test/coverage'
    },
    preprocessors: {
      'app/common/app.js': 'coverage',
      'app/common/!app.spec.js': 'coverage',
      'app/**/**/!(*.pageobject|*.scenario|*.spec).js': 'coverage',
      'app/**/*.html': 'ng-html2js'
    },
    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/'
    },
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [

// TODO: check if karma works 

      // bower:js
      // endbower

      'test/js/tools/*.js',

      'app/common/*/*.js',
      'app/common/*/**/*.js',

      'app/components/*/*.js',
      'app/components/*/**/*.js',

      'app/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [
      'app/assets/**/*',
      'app/common/app/*'
    ],

    // web server port
    port: 8081,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-nyan-reporter',
      'karma-coverage',
      'karma-ng-html2js-preprocessor',
      'karma-html-reporter'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    //    Uncomment the following lines if you are using grunt's server to run the tests
    //    proxies: {
    //       '/': 'http://localhost:8081/'
    //    },
    //    URL root prevent conflicts with the site root
    //    urlRoot: '_karma_'
  });
};
