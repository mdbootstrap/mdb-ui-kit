module.exports = function(grunt) {
    "use strict";

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        less: {
            production: {
                options: {
                    paths: ["less"]
                },
                files: {
                    "css-compiled/material.css": "less/material.less",
                    "css-compiled/material-wfont.css": "less/material-wfont.less",
                    "css-compiled/ripples.css": "less/ripples.less"
                }
            }
        },

        sass: {
            production: {
                files: {
                    "css-compiled/material.css": "sass/material.scss",
                    "css-compiled/material-wfont.css": "sass/material-wfont.scss",
                    "css-compiled/ripples.css": "sass/ripples.scss"
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ["last 3 versions", "ie 8", "ie 9", "ie 10", "ie 11"]
            },
            dist: {
                files: {
                    "css-compiled/material.css": "css-compiled/material.css",
                    "css-compiled/material-wfont.css": "css-compiled/material-wfont.css",
                    "css-compiled/ripples.css": "css-compiled/ripples.css"
                }
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: "css-compiled/",
                src: ["*.css", "!*.min.css"],
                dest: "css-compiled/",
                ext: ".min.css"
            }
        },

        copy: {
            css: {
                src: "css-compiled/*.min.css",
                dest: "template/material/"
            },
            js: {
                src: "scripts/*.js",
                dest: "template/material/"
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
                "template/**/*.js"
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
                    "css-compiled/**/*.css",
                    "**/*.{png,jpg,jpeg,gif,webp,svg}"
                ]
            }
        }

    });

    grunt.registerTask("default", ["less", "autoprefixer", "cssmin", "copy"]);

    grunt.registerTask("scss", ["sass", "autoprefixer", "cssmin", "copy"]);

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
