// Generated on 2014-07-01 using generator-angular 0.9.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

/* jshint camelcase: false */

var fs = require('fs');
var modRewrite = require('connect-modrewrite');

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  var getCreds = function() {
    var path = 'credentials.json';
    return (fs.existsSync(path)) ? grunt.file.readJSON(path) : {};
  };

  var mainFiles = ['<%= yeoman.app %>/components/*/{,*/}*.js', '<%= yeoman.app %>/common/*/{,*/}*.js', '<%= yeoman.app %>/app.js'];
  var testFiles = ['<%= yeoman.app %>/components/*/{,*/*}*.spec.js', '<%= yeoman.app %>/common/*/{,*/*}*.spec.js'];
  var htmlFiles = ['components/*/views/{,*/}*.html', 'common/*/views/{,*/}*.html'];

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,
    creds: getCreds(),

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: mainFiles,
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= yeoman.app %>/**/*.{scss,sass}', '!<%= yeoman.app %>/assets/styleguide-sources-only/{,*/}*'],
        tasks: ['compass:server', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
        '<%= yeoman.app %>/components/*/views/{,*/}*.html',
        '<%= yeoman.app %>/common/*/views/{,*/}*.html',
        '<%= yeoman.app %>/index.html',
        '.tmp/assets/styles/{,*/}*.css',
        '<%= yeoman.app %>/assets/images/{,*/*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      styleguideStyles: {
        files: ['<%= yeoman.app %>/assets/styleguide-sources-only/styles.scss'],
        tasks: ['styleguide']
      },
      styleguideOtherAssets: {
        files: ['<%= yeoman.app %>/assets/styleguide-sources-only/**/{*,/}*.html', '<%= yeoman.app %>/assets/styleguide-sources-only/**/{*,/}*.js'],
        tasks: ['copy:styleguide']
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\woff|\\ttf|\\.png|\\.jpg|\\swf$ /index.html [L]']),
            connect.static('.tmp'),
            connect().use(
            '/bower_components',
            connect.static('./bower_components')
            ),
            connect.static(appConfig.app),
            connect().use(
            '/vendor',
            connect.static('./app/assets/vendor')
            )
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
            connect.static('.tmp'),
            connect.static('test'),
            connect().use(
            '/bower_components',
            connect.static('./bower_components')
            ),
            connect.static(appConfig.app)
            ];
          }
        }
      },
      doc: {
        options: {
          open: true,
          keepalive: true,
          port: 9002,
          base: 'doc'
        }
      },
      dist: {
        options: {
          open: true,
          port: 9002,
          keepalive: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
        'Gruntfile.js',
        mainFiles
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: testFiles
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
          '.tmp',
          '<%= yeoman.dist %>/{,*/}*',
          '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      doc: 'doc/'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        exclude: [
        'bootstrap-sass-official',
        '/bower_components/bootstrap/',
        'bower_components/font-awesome/scss/'
        ]
      },
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//,
        overrides: {
          'angulartics': {
            main: ['src/angulartics.js', 'src/angulartics-ga.js']
          }
        }
      },
      sass: {
        src: ['<%= yeoman.app %>/{,*/}*.{scss,sass}'],
        ignorePath: /\.\.\.\//
      }
    },
    /* STYLES SECTION */
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>',
        cssDir: '.tmp',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/assets/images',
        javascriptsDir: '<%= yeoman.app %>/(components|common)/{,*/}*',
        fontsDir: '<%= yeoman.app %>/assets/fonts',
        importPath: [
        'bower_components/'
        ],
        httpImagesPath: '/assets/images',
        httpGeneratedImagesPath: '/assets/images/generated',
        httpFontsPath: '/assets/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\nEncoding.default_external = "UTF-8"\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      },
      styleguide: {
        options: {
          sassDir: ['<%= yeoman.app %>/assets', '!<%= yeoman.app %>/assets/styles/main.scss']
        }
      }
    },
    /* ENDS STYLES SECTION */
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
        '<%= yeoman.dist %>/scripts/{,*/}*.js',
        '<%= yeoman.dist %>/assets/styles/{,*/}*.css',
        '<%= yeoman.dist %>/assets/images/{,*/*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/*.html', '<%= yeoman.dist %>/components/*/views/{,*/}*.html', '<%= yeoman.dist %>/common/*/views/{,*/}*.html'],
      htmlExtra: ['<%= yeoman.dist %>/*.html', '<%= yeoman.dist %>/components/*/views/{,*/*}*.html', '<%= yeoman.dist %>/common/*/views/{,*/*}*.html', '<%= yeoman.dist %>/{,*/}*.js'],
      css: ['<%= yeoman.dist %>/assets/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/assets', '<%= yeoman.dist %>/assets/images', '<%= yeoman.dist %>/assets/images/{,*/*}*'],
        patterns: {
          htmlExtra: [
          [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the angular directives that ref revved images']
          ]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   options: {
    //     target: '.tmp/styles/*.css',
    //     relativeTo: '.tmp/styles/'
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets/images',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', htmlFiles],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngAnnotate tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
          '*.{ico,png,txt}',
          '.htaccess',
          '*.html',
          htmlFiles,
          'assets/images/{,*/*}*.{webp}',
          'assets/fonts/**/*',
          'locales/*.json'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, { //ionicons
          flatten: true,
          expand: true,
          cwd: '.',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: 'bower_components/ionicons/fonts/*.*'
        }]
      },
      dev: {
        files: [{ //bootstrap font icons
          flatten: true,
          expand: true,
          cwd: '.',
          dest: '<%= yeoman.app %>/assets/fonts/bootstrap',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*'
        }, { //ion-icons. This is copied to a scss to be able to @extend their classes into our styles
          flatten: true,
          expand: true,
          cwd: '.',
          dest: '<%= yeoman.app %>/assets/styles/vendor/ion-icons/',
          src: 'bower_components/ionicons/scss/ionicons.scss',
          rename: function(dest, src) {
            return dest + src.replace(/\ionicons.scss$/, '_ionicons.scss');
          }
        }, { //ion-icons font icons
          flatten: true,
          expand: true,
          cwd: '.',
          dest: '<%= yeoman.app %>/assets/fonts/',
          src: 'bower_components/ionicons/fonts/*.*'
        }, {
          expand: true,
          cwd: 'bower_components/intl-tel-input/build/img',
          dest: '<%= yeoman.app %>/assets/images/profile',
          src: ['*']
        }

        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/assets/styles',
        dest: '.tmp/',
        src: '{,*/}*.css'
      },
      styleguide: {
        files: [{
          expand: true,
          src: ['<%= yeoman.app %>/assets/fonts/**/*'],
          dest: 'styleguide/assets/fonts/'
        }, {
          expand: true,
          flatten: true,
          src: ['.tmp/assets/styleguide-sources-only/styles.css'],
          dest: 'styleguide/css/'
        },
        // TODO: grunt watch this files to copy
					{
  expand: true,
  flatten: true,
  src: ['app/assets/styleguide-sources-only/**/{*,/}*.html', 'app/assets/styleguide-sources-only/**/{*,/}*.js'],
  dest: 'styleguide/js/'
					},
					// ngToast
					{
  expand: true,
  flatten: true,
  src: ['bower_components/ngToast/dist/ngToast.min.js',
  'bower_components/ngToast/dist/ngToast.min.css',
  'bower_components/angular-sanitize/angular-sanitize.min.js'
  ],
  dest: 'styleguide/vendor/ngToast/'
					}
					// ngToast end
				]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
      'compass:server'
      ],
      test: [
      'compass'
      ],
      dist: [
      'compass:dist',
      'imagemin',
      'svgmin'
      ]
    },

    // Test settings

    //units
    karma: {
      options: {
        configFile: 'test/karma.conf.js',
      },
      unit: {
        singleRun: false,
      },
      ci: {
        singleRun: true
      }
    },
    /*
    		 ***************************** NGTEMPLATES TASKS *****************************
    		 */
    ngtemplates: {
      app: {
        cwd: '<%= yeoman.app %>',
        src: htmlFiles,
        dest: 'app/templates.js',
        options: {
          module: 'verusdaat',
          usemin: 'scripts/scripts.js'
        }
      }
    },
    /*
    		 ***************************** NGDOCS TASKS *****************************
    		 */
    ngdocs: {
      options: {
        dest: 'doc',
        scripts: ['bower_components/angular/angular.js', 'bower_components/angular-animate/angular-animate.js'],
        html5Mode: false,
        startPage: '/',
        title: 'Verusdaat',
        titleLink: '/',
        bestMatch: true,
      },
      common: {
        src: ['app/common/**/{*,/}*.js'],
        title: 'Verusdaat common'
      }
    },
    /*
    		 ***************************** END NGDOCS TASKS *****************************
    		 */
    ngconstant: {
      options: {
        name: 'verusdaat.env',
        dest: '<%= yeoman.app %>/common/env/env.js',
        wrap: '\'use strict\';\n\n/**\n* Env module.\n* @ngdoc overview\n* @name Env\n* @description\n*\n* # Main module of the feature.\n*/\n\n(function() {\n  {%= __ngModule %}\n\n})();'
      },
      dev: {
        constants: {
          API: 'https://alpha.veruscript.com/api/',
          imagesUrl: 'https://d255sqxxuo41n7.cloudfront.net/',
          environment: 'dev',
          ANALYTICS: false
        }
      },
      beta: {
        constants: {
          API: 'https://beta.veruscript.com/api/',
          imagesUrl: 'https://d255sqxxuo41n7.cloudfront.net/',
          environment: 'beta',
          ANALYTICS: true
        }
      },
      production: {
        constants: {
          API: 'https://veruscript.com/api/',
          imagesUrl: 'https://d255sqxxuo41n7.cloudfront.net/',
          environment: 'production',
          ANALYTICS: true
        }
      },
      localSails: {
        constants: {
          API: 'http://localhost:1337/api/',
          imagesUrl: 'http://d255sqxxuo41n7.cloudfront.net/',
          environment: 'local',
          ANALYTICS: false
        }
      },
      localJson: {
        constants: {
          API: 'http://localhost:13337/',
          imagesUrl: 'http://d255sqxxuo41n7.cloudfront.net/',
          environment: 'local',
          ANALYTICS: false
        }
      }
    },
    s3: {
      options: {
        accessKeyId: '<%= creds.aws.accessKeyId %>',
        secretAccessKey: '<%= creds.aws.secretAccessKey %>',
        bucket: 'vd-frontend-eu',
        gzip: true,
        access: 'public-read'
      },
      js: {
        cwd: 'dist/scripts',
        src: '**',
        dest: 'js/'
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [{
            match: /scripts\//g,
            replacement: 'http://d1aq0hsrpvn8pj.cloudfront.net/'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'dist',
          src: ['index.html'],
          dest: 'dist'
        }]
      },
      ionIconPaths: {
        options: {
          patterns: [{
            match: /@import "/g,
            replacement: '@import "ionicons/scss/'
          }]
        },
        files: [{
          src: ['<%= yeoman.app %>/assets/styles/vendor/ion-icons/_ionicons.scss'],
          dest: '<%= yeoman.app %>/assets/styles/vendor/ion-icons/_ionicons.scss'
        }]
      },
      analytics: {
        options: {
          patterns: [{
            match: /UA\-57351322\-2/g,
            replacement: 'UA-57351322-3'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'dist',
          src: ['index.html'],
          dest: 'dist'
        }]
      }
    },
    'json_server': { //mini server for the mocks
      dev: {
        options: {
          port: 13337,
          hostname: '0.0.0.0',
          db: 'test/mocks/data.json'
        }
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    switch (target) {
      case 'dist':
        return grunt.task.run(['build', 'connect:dist:keepalive']);
        break;
      case 'alpha':
        grunt.task.run('ngconstant:dev');
        break;
      case 'localSails':
        grunt.task.run('ngconstant:localSails');
        break;
      case 'localJson':
        grunt.task.run('ngconstant:localJson');
        break;
    }

    grunt.task.run([
    'clean:server',
    'wiredep',
    'copy:dev',
    'replace:ionIconPaths',
    'concurrent:server',
    'autoprefixer',
    'connect:livereload'
    ]);
  });
  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  var env = process.env.NODE_ENV;

  grunt.registerTask('build', function() {
    var tasks = [];
    if (process.env.TRAVIS) {
      tasks.push('ngconstant:dev');
    } else {
      switch (env) {
        case 'beta':
        case 'production': {
          tasks.push('ngconstant:' + env);
          break;
        }
        case 'local': {
          tasks.push('ngconstant:' + env);
          break;
        }
        default: {
          tasks.push('ngconstant:dev');
        }

      }
      tasks.push(
      'clean:dist',
      'wiredep',
      'useminPrepare',
      'copy:dev',
      'replace:ionIconPaths',
      'compass:dist',
      'imagemin',
      'svgmin',
      'autoprefixer',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cdnify',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin'
      );

      if (env === 'production') {
        tasks.push(
        's3',
        'replace'
        );
      } else if (env === 'beta') {
        tasks.push('replace:analytics');
      }

      grunt.task.run(tasks);
    }
  });

  grunt.registerTask('initTest', [
  'clean:server',
  'concurrent:test',
  'autoprefixer',
  'connect:test'
  ]);

  grunt.registerTask('testCi', [
  'initTest',
  'ngconstant:dev',
  'karma:ci'
  ]);
  grunt.registerTask('units', [
  'initTest',
  'karma:unit'
  ]);
  grunt.registerTask('doc', [
  'clean:doc',
  'ngdocs',
  'connect:doc'
  ]);
  grunt.registerTask('default', [
  'newer:jshint',
  'test',
  'build'
  ]);
  grunt.registerTask('styleguide', [
  'compass:styleguide',
  'compass:server',
  'copy:styleguide'
  ]);
};
