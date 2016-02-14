// Generated on 2014-07-01 using generator-angular 0.9.2
'use strict';

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

  var mainFiles = ['<%%= yeoman.app %>/components/*/{,*/}*.js', '<%%= yeoman.app %>/common/*/{,*/}*.js', '<%%= yeoman.app %>/app.js'];
  var testFiles = ['<%%= yeoman.app %>/components/*/{,*/*}*.spec.js', '<%%= yeoman.app %>/common/*/{,*/*}*.spec.js'];
  var htmlFiles = ['components/*/views/{,*/}*.html', 'common/*/views/{,*/}*.html'];
  var includeSourceFiles = {
    'app/index.html': 'app/index.html',
    'app/assets/styles/main.scss': 'app/assets/styles/main.scss'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: mainFiles,
        tasks: ['newer:jshint:all', 'newer:includeSource'],
        options: {
          livereload: '<%%= connect.options.livereload %>'
        }
      },
      sass: {
        files: ['<%%= yeoman.app %>/**/*.{scss,sass}', '!<%%= yeoman.app %>/assets/styleguide-sources-only/{,*/}*'],
        tasks: ['sass:dist', 'autoprefixer', 'newer:includeSource']
      },
      indexHtml: {
        files: ['<%%= yeoman.app %>/index.html'],
        tasks: ['newer:includeSource']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
        '<%%= yeoman.app %>/components/*/views/{,*/}*.html',
        '<%%= yeoman.app %>/common/*/views/{,*/}*.html',
        '<%%= yeoman.app %>/index.html',
        '.tmp/assets/styles/{,*/}*.css',
        '<%%= yeoman.app %>/assets/images/{,*/*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    focus: {
      dev: {
        include: ['sass', 'livereload']
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
            ),
            connect().use(
              '/images',
              connect.static('./app/assets/images')
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
          base: '<%%= yeoman.dist %>'
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
          '<%%= yeoman.dist %>/{,*/}*',
          '!<%%= yeoman.dist %>/.git*'
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
          cwd: '.tmp/assets/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/assets/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//,
        overrides: {
          'angulartics': {
            main: ['src/angulartics.js', 'src/angulartics-ga.js']
          }
        }
      },
      sass: {
        src: ['<%%= yeoman.app %>/{,*/}*.{scss,sass}'],
        ignorePath: /\.\.\.\//
      },
      testKarma: {
          src: ['test/karma.conf.js'],
          fileTypes: {
            js: {
              block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          },
          devDependencies: true,
          exclude: [/jasmine/]
      }
    },
    /* STYLES SECTION */
    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        sourceComments: false,
        includePaths: [
          'bower_components',
          '<%%= yeoman.app %>/'
        ],
        imagePath: '<%%= yeoman.app %>/assets/images',
        precision: 10
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: ['**/*.scss'],
          dest: '.tmp',
          ext: '.css',
          extDot: 'last'
        }]
      }
    },
    /* ENDS STYLES SECTION */
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
        '<%%= yeoman.dist %>/assets/styles/{,*/}*.css',
        '<%%= yeoman.dist %>/assets/images/{,*/*}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>',
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
      html: ['<%%= yeoman.dist %>/*.html', '<%%= yeoman.dist %>/components/*/views/{,*/}*.html', '<%%= yeoman.dist %>/common/*/views/{,*/}*.html'],
      htmlExtra: ['<%%= yeoman.dist %>/*.html', '<%%= yeoman.dist %>/components/*/views/{,*/*}*.html', '<%%= yeoman.dist %>/common/*/views/{,*/*}*.html', '<%%= yeoman.dist %>/{,*/}*.js'],
      css: ['<%%= yeoman.dist %>/assets/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%%= yeoman.dist %>', '<%%= yeoman.dist %>/assets', '<%%= yeoman.dist %>/assets/images', '<%%= yeoman.dist %>/assets/images/{,*/*}*'],
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
    //       '<%%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%%= yeoman.dist %>/scripts/scripts.js'
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
          cwd: '<%%= yeoman.app %>/assets/images',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/assets/images',
          src: '**/*.svg',
          dest: '<%%= yeoman.dist %>/images'
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
          cwd: '<%%= yeoman.dist %>',
          src: ['*.html', htmlFiles],
          dest: '<%%= yeoman.dist %>'
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
        html: ['<%%= yeoman.dist %>/*.html']
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
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
          dest: '<%%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>/assets/styles',
        dest: '.tmp/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'sass:dist'
      ],
      test: [
        'sass'
      ],
      dist: [
        'sass:dist',
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
      }
    },
    /*
    		 ***************************** NGTEMPLATES TASKS *****************************
    		 */
    ngtemplates: {
      app: {
        cwd: '<%%= yeoman.app %>/',
        src: htmlFiles,
        dest: 'app/templates.js',
        options: {
          module: '<%%= appName %>',
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
        scripts: ['bower_components/angular/angular.js'],
        html5Mode: false,
        startPage: '/',
        title: '<%%= appName %>',
        titleLink: '/',
        bestMatch: true,
      },
      common: {
        src: ['app/common/**/{*,/}*.js'],
        title: '<%%= appName %> common'
      }
    },
    /*
    		 ***************************** END NGDOCS TASKS *****************************
    		 */
         /**
              * INCLUDE AUTOMATICALLY SCRIPTS FROM COMMON AND COMPONENTS INTO INDEX
              */
              includeSource: {
                mainTarget: {
                  options: {
                    ordering: 'top-down'
                  },
                  files: includeSourceFiles
                }
              },
             /**
              * END INCLUDE
              */
    ngconstant: {
      options: {
        name: '<%%= appName %>.env',
        dest: '<%%= yeoman.app %>/common/env/env.js',
        wrap: '\'use strict\';\n\n/**\n* Env module.\n* @ngdoc overview\n* @name Env\n* @description\n*\n* # Main module of the feature.\n*/\n\n(function() {\n  {%= __ngModule %}\n\n})();'
      },
      dev: {
        constants: {
          API: 'https://alpha.<%%= appName %>.com/api/',
          environment: 'dev'
        }
      },
      beta: {
        constants: {
          API: 'https://beta.<%%= appName %>.com/api/',
          environment: 'beta'
        }
      },
      production: {
        constants: {
          API: 'https://<%%= appName %>.com/api/',
          environment: 'production'
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
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'includeSource',
      'connect:livereload',
      'focus:dev'
    ]);
  });

  var env = process.env.NODE_ENV;

  grunt.registerTask('build', function() {
    var tasks = [];
    switch (env) {
      case 'beta': {
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
      'sass:dist',
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
        'replace'
      );
    } else if (env === 'beta') {
      tasks.push('replace:analytics');
    }

    grunt.task.run(tasks);

  });

  grunt.registerTask('initTest', [
  'clean:server',
  'concurrent:test',
  'autoprefixer',
  'connect:test'
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
};
