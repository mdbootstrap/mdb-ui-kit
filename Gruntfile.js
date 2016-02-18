module.exports = function (grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);
  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', {encoding: 'utf8'});

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
    jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),


    // Task configuration.
    clean: {
      dist: 'dist'
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true
        },
        expand: true,
        cwd: '_gh_pages',
        dest: '_gh_pages',
        src: [
          '**/*.html',
          '!examples/**/*.html'
        ]
      }
    },

    htmllint: {
      //options: {
      //  stoponerror: false,
      //  relaxerror: []
      //},
      //files: ['index.html', 'bootstrap-elements.html']
      all: {
        options: {
          ignore: '“&” did not start a character reference. (“&” probably should have been escaped as “&amp;”.)'
        },
        src: ["*.html"]
      }
    },


    // Make sure we are structurally correct for bootstrap
    bootlint: {
      options: {
        stoponerror: false,
        relaxerror: []
      },
      files: ['index.html', 'bootstrap-elements.html']
    },

    // Convert from less to sass
    lessToSass: {
      convert: {
        files: [{
          expand: true,
          cwd: "less",
          src: ["**/*.less", "!_mixins.less", "!_import-bs*"],
          ext: ".scss",
          dest: "sass"
        }],
        options: {
          replacements: [

            // convert bootstrap imports
            { // https://regex101.com/r/bM6cP0/2
              pattern: /bower_components\/(bootstrap\/less\/)/gi,
              replacement: "bower_components\/bootstrap-sass\/assets\/stylesheets\/bootstrap\/",
              order: 2
            },

            // convert conditional when not
            { // https://regex101.com/r/cX6uF4/1
              pattern: /& when not \(isstring\(\$parent\)\)/gi,
              replacement: "@if not $parent",
              order: 2
            },

            // convert conditional when
            { // https://regex101.com/r/gH0jP0/2
              pattern: /& when \(isstring\(\$parent\)\)/gi,
              replacement: "@else",
              order: 2
            },

            // convert conditional when
            { // https://regex101.com/r/dL1lI8/2
              pattern: /& when /gi,
              replacement: "@if ",
              order: 2
            },

            // convert all shadow mixins
            { // https://regex101.com/r/sJ2lH4/1
              pattern: /.shadow-z-(\d+)((?:-hover)?) {/gi,
              replacement: "@mixin shadow-z-$1$2 {",
              order: 2
            },
            // bad conversions of .shadow-z-*
            { // https://regex101.com/r/pV0yB0/3
              pattern: /\.shadow-z-(\d+)((?:-hover)?)(?:\(\))?;/gi,
              replacement: "@include shadow-z-$1$2;",
              order: 2
            },

            // bad conversions to @include instead of @extend
            {
              pattern: /@include (foo1|foo2)\(\);/gi,
              replacement: "@extend .$1;",
              order: 2
            },

            // hack - (no conditional replacements)
            { // https://regex101.com/r/pV0yB0/2
              pattern: /@extend @extend/gi,
              replacement: "@extend",
              order: 10
            },

            // button variations mixin replacement(s)
            { // https://regex101.com/r/qD9qB8/4
              pattern: /.generic-variations\(unquote\(".btn", ~("([^"]+)?")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+}\);$\n/mg,
              replacement: "@include button-variations(unquote(\".btn\"), $1, $3);\n",
              order: 20
            },

            //// background-color generic-variations
            //{ // Multi-line replacement - https://regex101.com/r/cW6pH8/2
            //  pattern: /.generic-variations\(unquote\(("[^"]+")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)background-color[\s\S]+?(?!\r|\n)(\(\d+\/\d+\))[\s\S]+?(?!\r|\n)}\);$\n/mg,
            //  replacement: "@include bg-color-variations(unquote($1), $2, $3);\n",
            //  order: 21
            //},

            //// bg-box-shadow generic-variations
            //{ // Multi-line replacement - https://regex101.com/r/jW8kR1/1
            //  pattern: /.generic-variations\(unquote\(("[^"]+")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)box-shadow[\s\S]+?(?!\r|\n)[\s\S]+?(?!\r|\n)}\);$\n/mg,
            //  replacement: "@include bg-box-shadow-variations(unquote($1), $2);\n",
            //  order: 22
            //},

            //// bg-img generic-variations
            //{ // Multi-line replacement - https://regex101.com/r/aP2hH2/1
            //  pattern: /.generic-variations\(unquote\(("[^"]+")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)background-image[\s\S]+?(?!\r|\n)[\s\S]+?(?!\r|\n)}\);$\n/mg,
            //  replacement: "@include bg-img-variations(unquote($1), $2);\n",
            //  order: 23
            //},

            // material-placeholder
            { // Multi-line replacement - https://regex101.com/r/eS2vQ3/2
              pattern: /.material-placeholder\({$\n([\s\S]+?)}\);$\n/mg,
              replacement: "@include material-placeholder {\n$1\n}\n",
              order: 24
            },

            // navbar generic-variations
            { // Multi-line replacement - https://regex101.com/r/lX1hH1/4
              pattern: /.generic-variations\(unquote\((".navbar"), ~("([^"]+)?")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)[\s\S]+?(?!\r|\n)[\s\S]+?(?!\r|\n)}\);$/mg,
              replacement: "@include navbar-variations(unquote($1), unquote($2), $4);\n",
              order: 25
            },

            // fix calc references
            { // https://regex101.com/r/aZ8iI5/1
              pattern: /calc\(unquote\("([^"]+)"\)\)/gi,
              replacement: "calc($1)",
              order: 100
            },

            // fix unquote("", ~"")
            { //  https://regex101.com/r/vX4nO9/6
              pattern: /\(unquote\(("([^"]+)?"), ~("([^"]+)?")\),/gi,
              replacement: "(unquote($1), unquote($3),",
              order: 101
            },

            // alert generic-variations (convert this one last - very broad search)
            { // Multi-line replacement - https://regex101.com/r/jB1uL1/3
              pattern: /.generic-variations\(unquote\(".alert"\), unquote\(("([^"]+)?")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+}\);$\n/mg,
              replacement: "@include alert-variations(unquote(\".alert\"), unquote($1), $3);\n",
              order: 250 // very broad search, do this last
            },

            // auto generated notice
            { // Multi-line replacement - https://regex101.com/r/aR2kT5/1
              pattern: /([\s\S]+)/mg,
              replacement: "\/\/ This file has been autogenerated by grunt task lessToSass. Any changes will be overwritten.\n\n$1",
              order: 1000 // very broad search, do this last
            }
          ]
        }
      }
    },

    // Test compile sass
    sass: {
      compile: {
        options:{
          loadPath: "bower_components/bootstrap-sass/assets/stylesheets",
        },
        files: [{
          expand: true,
          cwd: "sass",
          src: ["bootstrap-material-design.scss", "ripples.scss"],
          dest: "dist/sassc", // added to gitignore, only used for local testing
          ext: ".css"
        }]
      }
    },

    // Compile less to .css
    // Compile less to .min.css
    // Create source maps of both
    less: {
      material: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/css/bootstrap-material-design.css.map",
          sourceMapURL: "bootstrap-material-design.css.map"
        },
        files: {
          "dist/css/bootstrap-material-design.css": "less/bootstrap-material-design.less",
        }
      },
      ripples: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/css/ripples.css.map",
          sourceMapURL: "ripples.css.map",
          outputSourceFiles: true
        },
        files: {
          "dist/css/ripples.css": "less/ripples.less",
        }
      }
    },

    // Autoprefix .css and edit its source map
    // Autoprefix .min.css an edit its source map
    autoprefixer: {
      options: {
        map: true,
        browsers: configBridge.config.autoprefixerBrowsers
      },
      material: {
        files: {
          "dist/css/bootstrap-material-design.css": "dist/css/bootstrap-material-design.css"
        }
      },
      ripples: {
        files: {
          "dist/css/ripples.css": "dist/css/ripples.css"
        }
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      dist: [
        'dist/css/bootstrap-material-design.css',
        'dist/css/ripples.css',
      ],
      distmin: [
        'dist/css/bootstrap-material-design.min.css',
        'dist/css/ripples.min.css',
      ]
    },

    // Minify CSS and adapt maps
    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      material: {
        src: "dist/css/bootstrap-material-design.css",
        dest: "dist/css/bootstrap-material-design.min.css"
      },
      ripples: {
        src: "dist/css/ripples.css",
        dest: "dist/css/ripples.min.css"
      }
    },

    // Copy .js to dist/js/ folder
    copy: {
      material: {
        src: "scripts/material.js",
        dest: "dist/js/material.js"
      },
      ripples: {
        src: "scripts/ripples.js",
        dest: "dist/js/ripples.js"
      },
      fonts: {
        expand: true,
        cwd: "fonts/",
        src: "**",
        dest: "dist/fonts/",
        flatten: true,
        filter: "isFile"
      }
    },

    // Compile .js to .min.js
    uglify: {
      options: {
        sourceMap: true
      },
      material: {
        files: {
          "dist/js/material.min.js": "dist/js/material.js"
        }
      },
      ripples: {
        files: {
          "dist/js/ripples.min.js": "dist/js/ripples.js"
        }
      }
    },

    connect: {
      options: {
        port: 8040,
        hostname: "localhost",
        livereload: 35729

      },
      livereload: {
        options: {
          open: true,
          base: "."
        }
      },
      test: {
        options: {
          port: 8041,
          open: "http://localhost:8041/_SpecRunner.html",
          base: "."
        }
      }
    },
    jasmine: {
      scripts: "scripts/**/*.js",
      options: {
        build: true,
        specs: "test/*Spec.js",
        helpers: "test/*Helper.js",
        vendor: [
          "https://code.jquery.com/jquery-1.10.2.min.js",
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: "scripts/.jshintrc",
        reporter: require("jshint-stylish")
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: ['Gruntfile.js', 'package.js']
      },
      core: {
        src: ["scripts/**/*.js"]
      },
      test: {
        src: ["test/**/*.js"]
      }
    },

    jscs: {
      options: {
        config: 'scripts/.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      },
      core: {
        src: '<%= jshint.core.src %>'
      },
      test: {
        src: '<%= jshint.test.src %>'
      },
      assets: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: '<%= jshint.assets.src %>'
      }
    },

    watch: {
      html: {
        files: ["index.html", "bootstrap-elements.html", "testcase.html"],
        tasks: ["htmllint", "bootlint"]
      },
      src: {
        files: '<%= jshint.core.src %>',
        tasks: ['jshint:core', 'dist-js'] // add tests when working again
      },
      test: {
        files: ["test/**/*.js"],
        tasks: ["jshint:test", "jasmine"]
      },
      less: {
        files: ["less/**/*.less"],
        tasks: ["dist-less"]
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: [
          "index.html",
          "bootstrap-elements.html",
          "dist/js/**/*.js",
          "dist/css/**/*.css",
          "demo/**/*.{png,jpg,jpeg,gif,webp,svg}"
        ]
      }
    },

    compress: {
      main: {
        options: {
          archive: 'bootstrap-material-design-<%= pkg.version %>-dist.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: 'bootstrap-material-design-<%= pkg.version %>-dist'
          }
        ]
      }
    },

    exec: {
      "meteor-init": {
        command: [
          // Make sure Meteor is installed, per https://meteor.com/install.
          // The curl'ed script is safe; takes 2 minutes to read source & check.
          "type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }",
          // Meteor expects package.js to be in the root directory of
          // the checkout, so copy it there temporarily
          "cp meteor/package.js ."
        ].join(";")
      },
      "meteor-cleanup": {
        // remove build files and package.js
        command: "rm -rf .build.* versions.json package.js"
      },
      "meteor-test": {
        command: "node_modules/.bin/spacejam --mongo-url mongodb:// test-packages ./"
      },
      "meteor-publish": {
        command: [
          "ALL_EXIT_CODE=0; for PACKAGE_FILE in meteor/package*.js",
          "do cp $PACKAGE_FILE ./package.js && meteor publish $@",
          "ALL_EXIT_CODE=$(echo $ALL_EXIT_CODE + $? | bc); done",
          "exit $ALL_EXIT_CODE"
        ].join(";")
      }
    }

  });


  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  //require('time-grunt')(grunt);

  grunt.registerTask('test-js', ['jshint:core', 'jshint:test', 'jshint:grunt', 'jscs:core', 'jscs:test', 'jscs:grunt', 'qunit']);
  grunt.registerTask("test", [
    "dist",
    "jasmine:scripts:build",
    "connect:test:keepalive"
  ]);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['htmllint']);

  grunt.loadNpmTasks("grunt-less-to-sass");

  // CSS distribution tasks
  grunt.registerTask("dist-sass", [
    "lessToSass:convert",
    "sass:compile"
  ]);

  grunt.registerTask('less-compile', [
    "less:material",
    "less:ripples"
  ]);

  grunt.registerTask("dist-less", [
    "less-compile",

    "autoprefixer:material",
    "autoprefixer:ripples",
    "csslint:dist",
    "cssmin:material",
    "cssmin:ripples",
    "csslint:distmin"
  ]);

  grunt.registerTask("dist-js", [
    "jshint",
    "copy:material",
    "uglify:material",
    "copy:ripples",
    "uglify:ripples"
  ]);

  grunt.registerTask("dist-fonts", [
    "copy:fonts"
  ]);

  // Full distribution
  grunt.registerTask("dist", [
    "clean:dist",

    "htmllint",
    "bootlint",

    "dist-less",
    "dist-sass",
    "dist-js",
    "dist-fonts",
    "dist-sass"
  ]);

  // Default task.
  grunt.registerTask('default', ['dist']); // test as well when it works?


  grunt.registerTask("serve", [
    "htmllint",
    "bootlint",
    "dist-less",
    "dist-js",
    "dist-fonts",
    "connect:livereload",
    "watch"
  ]);

  // Meteor tasks
  grunt.registerTask("meteor-test", ["exec:meteor-init", "exec:meteor-test", "exec:meteor-cleanup"]);
  grunt.registerTask("meteor-publish", ["exec:meteor-init", "exec:meteor-publish", "exec:meteor-cleanup"]);
  grunt.registerTask("meteor", ["exec:meteor-init", "exec:meteor-test", "exec:meteor-publish", "exec:meteor-cleanup"]);
};
