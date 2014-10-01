module.exports = function(grunt) {

    "use strict";

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
            },
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

        }

    });
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.registerTask("default", ["less", "autoprefixer", "cssmin", "copy"]);
};
