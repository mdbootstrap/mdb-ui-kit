module.exports = function (grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

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
          src: ["*.less", "!_mixins.less", "!_mixins-fullpalette.less", "!_mixins-shared.less"],
          ext: ".scss",
          dest: "sass"
        }],
        options: {
          replacements: [

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
            { // Multi-line replacement - https://regex101.com/r/qD9qB8/2
              pattern: /.generic-variations\(unquote\(("[^"]+")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)contrast[\s\S]+?(?!\r|\n)(\d+)[\s\S]+?(?!\r|\n)}\);$\n/mg,
              replacement: "@include button-variations(unquote($1), $2, $3%);\n",
              order: 20
            },

            // background-color generic-variations
            { // Multi-line replacement - https://regex101.com/r/cW6pH8/2
              pattern: /.generic-variations\(unquote\(("[^"]+")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)background-color[\s\S]+?(?!\r|\n)(\(\d+\/\d+\))[\s\S]+?(?!\r|\n)}\);$\n/mg,
              replacement: "@include bg-color-variations(unquote($1), $2, $3);\n",
              order: 21
            },

            // bg-box-shadow generic-variations
            { // Multi-line replacement - https://regex101.com/r/jW8kR1/1
              pattern: /.generic-variations\(unquote\(("[^"]+")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)box-shadow[\s\S]+?(?!\r|\n)[\s\S]+?(?!\r|\n)}\);$\n/mg,
              replacement: "@include bg-box-shadow-variations(unquote($1), $2);\n",
              order: 22
            },

            // bg-img generic-variations
            { // Multi-line replacement - https://regex101.com/r/aP2hH2/1
              pattern: /.generic-variations\(unquote\(("[^"]+")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)background-image[\s\S]+?(?!\r|\n)[\s\S]+?(?!\r|\n)}\);$\n/mg,
              replacement: "@include bg-img-variations(unquote($1), $2);\n",
              order: 23
            },

            // navbar generic-variations
            { // Multi-line replacement - https://regex101.com/r/lX1hH1/1
              pattern: /.generic-variations\(unquote\((".navbar")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+?(?!\r|\n)[\s\S]+?(?!\r|\n)[\s\S]+?(?!\r|\n)}\);$\n/mg,
              replacement: "@include navbar-variations(unquote($1), $2);\n",
              order: 24
            },

            // material-placehorder
            { // Multi-line replacement - https://regex101.com/r/eS2vQ3/2
              pattern: /.material-placeholder\({$\n([\s\S]+?)}\);$\n/mg,
              replacement: "@include material-placeholder {\n$1\n}\n",
              order: 24
            },

            // fix calc references
            { // https://regex101.com/r/aZ8iI5/1
              pattern: /calc\(unquote\("([^"]+)"\)\)/gi,
              replacement: "calc($1)",
              order: 24
            },

            // alert generic-variations (convert this one last - very broad search)
            { // Multi-line replacement - https://regex101.com/r/jB1uL1/1
              pattern: /.generic-variations\(unquote\(("([^"]+)?")\), (\$[\s\S]+?(?!\r|\n)), {$\n[\s\S]+}\);$\n/mg,
              replacement: "@include alert-variations(unquote($1), $3);\n",
              order: 250 // very broad search, do this last
            },

            // auto generated notice
            { // Multi-line replacement - https://regex101.com/r/aR2kT5/1
              pattern: /([\s\S]+)/mg,
              replacement: "\/\/ This file has been autogenerated by grunt task lessToSass. Any changes will be overwritten.\n\n$1",
              order: 1000 // very broad search, do this last
            },

          ]
        }
      }
    },

    // Test compile sass
    sass: {
      compile: {
        files: [{
          expand: true,
          cwd: "sass",
          //src: ['material.scss', 'material-fullpalette.scss', 'ripples.scss', 'roboto.scss'],
          src: ["material.scss", "material-fullpalette.scss", "roboto.scss", "ripples.scss"],
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
          sourceMapFilename: "dist/css/material.css.map",
          sourceMapURL: "material.css.map"
        },
        files: {
          "dist/css/material.css": "less/material.less",
        }
      },
      materialfullpalette: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/css/material-fullpalette.css.map",
          sourceMapURL: "material-fullpalette.css.map",
          outputSourceFiles: true
        },
        files: {
          "dist/css/material-fullpalette.css": "less/material-fullpalette.less",
        }
      },
      roboto: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/css/roboto.css.map",
          sourceMapURL: "roboto.css.map",
          outputSourceFiles: true
        },
        files: {
          "dist/css/roboto.css": "less/roboto.less",
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
        browsers: ["last 3 versions", "ie 8", "ie 9", "ie 10", "ie 11"]
      },
      material: {
        files: {
          "dist/css/material.css": "dist/css/material.css",
          "dist/css/material.min.css": "dist/css/material.min.css"
        }
      },
      materialfullpalette: {
        files: {
          "dist/css/material-fullpalette.css": "dist/css/material-fullpalette.css",
          "dist/css/material-fullpalette.min.css": "dist/css/material-fullpalette.min.css"
        }
      },
      roboto: {
        files: {
          "dist/css/roboto.css": "dist/css/roboto.css",
          "dist/css/roboto.min.css": "dist/css/roboto.min.css"
        }
      },
      ripples: {
        files: {
          "dist/css/ripples.css": "dist/css/ripples.css",
          "dist/css/ripples.min.css": "dist/css/ripples.min.css"
        }
      }
    },

    // Minify CSS and adapt maps
    csswring: {
      material: {
        src: "dist/css/material.css",
        dest: "dist/css/material.min.css"
      },
      materialfullpalette: {
        src: "dist/css/material-fullpalette.css",
        dest: "dist/css/material-fullpalette.min.css"
      },
      roboto: {
        src: "dist/css/roboto.css",
        dest: "dist/css/roboto.min.css"
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
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
      },
      all: [
        //"Gruntfile.js", regex lines are too long for desired style guide.
        "scripts/**/*.js",
        "template/**/*.js",
        "!template/**/*.min.js"
      ],
      test: {
        options: {
          jshintrc: "test/.jshintrc",
          src: ["test/**/*.js"]
        }
      }
    },
    watch: {
      html: {
        files: ["index.html", "bootstrap-elements.html", "test.html"],
        tasks: ["htmllint", "bootlint"]
      },
      js: {
        files: ["Gruntfile.js", "scripts/**/*.js", "template/**/*.js"],
        tasks: ["newer:jshint:all", "material:js"]
      },
      jsTest: {
        files: ["test/**/*.js"],
        tasks: ["newer:jshint:test", "jasmine"]
      },
      less: {
        files: ["less/**/*.less"],
        tasks: ["material:less"]//, "material:sass"]
      },
      //sass: {
      //  files: ["sass/*.scss"],
      //  tasks: ["material:sass"]
      //},
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

  grunt.loadNpmTasks("grunt-less-to-sass");

  grunt.registerTask("default", ["material", "ripples"]);

  grunt.registerTask("material", [
    "material:less",
    "material:js",
    "material:fonts",
    "material:sass"
  ]);

  grunt.registerTask("material:sass", [
    "lessToSass:convert",
    "sass:compile"
  ]);

  grunt.registerTask("material:less", [
    "htmllint",
    "bootlint",
    "less:material",
    "less:materialfullpalette",
    "less:roboto",
    "csswring:material",
    "csswring:materialfullpalette",
    "csswring:roboto",
    "autoprefixer:material",
    "autoprefixer:materialfullpalette",
    "autoprefixer:roboto"
  ]);
  grunt.registerTask("material:js", [
    "copy:material",
    "uglify:material"
  ]);
  grunt.registerTask("material:fonts", [
    "copy:fonts"
  ]);

  grunt.registerTask("ripples", [
    "ripples:less",
    "ripples:js"
  ]);
  grunt.registerTask("ripples:less", [
    "less:ripples",
    "csswring:ripples",
    "autoprefixer:ripples"
  ]);
  grunt.registerTask("ripples:js", [
    "copy:ripples",
    "uglify:ripples"
  ]);

  grunt.registerTask("build", function () {
    grunt.task.run(["newer:jshint", "default"]);
  });

  grunt.registerTask("test", [
    "jasmine:scripts:build",
    "connect:test:keepalive"
  ]);

  grunt.registerTask("serve", function (target) {
    var buildTarget = "material:less";
    if (target && target === "scss") {
      buildTarget = "scss";
    }
    grunt.task.run([
      "build:" + buildTarget,
      "connect:livereload",
      "watch"
    ]);
  });

  // Meteor tasks
  grunt.registerTask("meteor-test", ["exec:meteor-init", "exec:meteor-test", "exec:meteor-cleanup"]);
  grunt.registerTask("meteor-publish", ["exec:meteor-init", "exec:meteor-publish", "exec:meteor-cleanup"]);
  grunt.registerTask("meteor", ["exec:meteor-init", "exec:meteor-test", "exec:meteor-publish", "exec:meteor-cleanup"]);

  //grunt.registerTask("cibuild", ["newer:jshint", "meteor-test"]);
  grunt.registerTask("cibuild", ["build"]);
};
