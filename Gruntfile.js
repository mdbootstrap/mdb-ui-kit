module.exports = function(grunt) {
    "use strict";

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        less: {
            compileless: {
                options: {
                    paths: ["less"]
                },
                files: {
                    "dist/css/material.css": "less/material.less",
                    "dist/css/material-wfont.css": "less/material-wfont.less",
                    "dist/css/ripples.css": "less/ripples.less"
                }
            }
        },

        sass: {
            compilesass: {
                files: {
                    "dist/css/material.css": "sass/material.scss",
                    "dist/css/material-wfont.css": "sass/material-wfont.scss",
                    "dist/css/ripples.css": "sass/ripples.scss"
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ["last 3 versions", "ie 8", "ie 9", "ie 10", "ie 11"]
            },
            prefix: {
                files: {
                    "dist/css/material.css": "dist/css/material.css",
                    "dist/css/material-wfont.css": "dist/css/material-wfont.css",
                    "dist/css/ripples.css": "dist/css/ripples.css"
                }
            }
        },

        cssmin: {
            minifycss: {
                expand: true,
                cwd: "dist/css/",
                src: ["*.css", "!*.min.css"],
                dest: "dist/css/",
                ext: ".min.css"
            }
        },

        uglify: {
            minifyjs: {
                files: {
                    "dist/js/material.min.js": "scripts/material.js",
                    "dist/js/ripples.min.js": "scripts/ripples.js"
                }
            }
        },

        copy: {
            distjs: {
                expand: true,
                cwd: "scripts/",
                src: "**.min.js",
                dest: "dist/js/",
                flatten: true,
                filter: "isFile"
            },
            distfonts: {
                expand: true,
                cwd: "fonts/",
                src: "**",
                dest: "dist/fonts/",
                flatten: true,
                filter: "isFile"
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
                "Gruntfile.js",
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
            js: {
                files: ["Gruntfile.js", "scripts/**/*.js", "template/**/*.js"],
                tasks: ["newer:jshint:all"]
            },
            jsTest: {
                files: ["test/**/*.js"],
                tasks: ["newer:jshint:test", "jasmine"]
            },
            less: {
                files:["less/**/*.less"],
                tasks: ["default"]
            },
            sass: {
                files: ["sass/**/*.scss", "sass/**/*.sass"],
                tasks: ["scss"]
            },
            livereload: {
                options: {
                    livereload: "<%= connect.options.livereload %>"
                },
                files: [
                    "index.html",
                    "dist/css/**/*.css",
                    "**/*.{png,jpg,jpeg,gif,webp,svg}"
                ]
            }
        }

    });

    grunt.registerTask("default", ["less", "autoprefixer", "cssmin", "uglify", "copy"]);

    grunt.registerTask("scss", ["sass", "autoprefixer", "cssmin", "uglify", "copy"]);

    grunt.registerTask("build", function(target) {
        var buildType = "default";
        if (target && target === "scss") {
            buildType = "scss";
        }

        grunt.task.run(["newer:jshint", "jasmine:scripts", buildType]);
    });

    grunt.registerTask("test", [
        "jasmine:scripts:build",
        "connect:test:keepalive"
    ]);

    grunt.registerTask("serve", function(target){
        var buildTarget = "default";
        if(target && target === "scss") {
            buildTarget = "scss";
        }
        grunt.task.run([
            "build:"+ buildTarget,
            "connect:livereload",
            "watch"
        ]);
    });

    grunt.registerTask("cibuild",["newer:jshint", "jasmine:scripts"]);
};
