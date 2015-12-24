---
layout: docs
title: Build tools
group: getting-started
---

Material Design for Bootstrap uses [Grunt](http://gruntjs.com) for its CSS and JavaScript build system and Jekyll for the written documentation. Our Gruntfile includes convenient methods for working with the framework, including compiling code, running tests, and more.

## Tooling setup

To use our Gruntfile and run our documentation locally, you'll need a copy of Material Design for Bootstrap's source files, Node, and Grunt. Follow these steps and you should be ready to rock:

1. [Download and install Node](https://nodejs.org/download), which we use to manage our dependencies.
2. Install the Grunt command line tools, `grunt-cli`, with `npm install -g grunt-cli`.
3. Navigate to the root `/bootstrap-material-design` directory and run `npm install` to install our local dependencies listed in [package.json](https://github.com/FezVrasta/bootstrap-material-design/blob/master/package.json).
4. [Install RVM][install-rvm]
5. Install ruby. `cd bootstrap-material-design` and if installation is needed, it will give an install command such as `To install do: 'rvm install ruby-2.x.x'`
6. Install [Bundler][gembundler] with `gem install bundler`
7. Finally run `bundle install`. This will install all Ruby dependencies, such as Jekyll and plugins.
  - **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.

When completed, you'll be able to run the various Grunt commands provided from the command line.

[install-rvm]: https://rvm.io/rvm/install#1-download-and-run-the-rvm-installation-script
[gembundler]: http://bundler.io/

## Using Grunt

Our Gruntfile includes the following commands and tasks:

| Task | Description |
| --- | --- |
| `grunt` | Run `grunt` to run tests locally and compile the CSS and JavaScript into `/dist`. **Uses [Sass](http://sass-lang.com/), [Autoprefixer][autoprefixer], and [UglifyJS](http://lisperator.net/uglifyjs/).** |
| `grunt dist` | `grunt dist` creates the `/dist` directory with compiled files. **Uses [Sass](http://sass-lang.com/), [Autoprefixer][autoprefixer], and [UglifyJS](http://lisperator.net/uglifyjs/).** |
| `grunt test` | Runs [scss-lint](https://github.com/brigade/scss-lint), [ESLint](http://eslint.org/) and [QUnit](http://qunitjs.com/) tests headlessly in [PhantomJS](http://phantomjs.org/) (used for CI). |
| `grunt docs` | Builds and tests CSS, JavaScript, and other assets which are used when running the documentation locally via `jekyll serve`. |
| `grunt watch` | This is a convenience method for watching just Sass files and automatically building them whenever you save. |

## Switching Sass compilers

Material Design for Bootstrap will be compiled with [libsass][libsass] by default, but you can opt into traditional Ruby Sass by setting the `MDB_SASS` environment variable. Two options are supported:

* `libsass` (default) to use [libsass][libsass] via [grunt-sass][grunt-sass].
* `sass` to use [Ruby Sass][ruby-sass] via [grunt-contrib-sass][grunt-contrib-sass].

For example, run `MDB_SASS=sass grunt` to test and build Material Design for Bootstrap with Ruby Sass.

## Autoprefixer

Material Design for Bootstrap uses [Autoprefixer][autoprefixer] (included in our Gruntfile and build process) to automatically add vendor prefixes to some CSS properties at build time. Doing so saves us time and code by allowing us to write key parts of our CSS a single time while eliminating the need for vendor mixins like those found in v3.


## Local documentation

Running our documentation locally requires the use of Jekyll, a flexible static site generator that provides us basic includes, 
markdown-based files, templates, and more. Here's how to get it started:

1. Run through the [tooling setup](#tooling-setup) above to install Jekyll (the site builder) and other Ruby dependencies with `bundle install`.
2. From the root `/bootstrap-material-design` directory, run `bundle exec jekyll serve` in the command line.
3. Open <http://localhost:9001> in your browser, and voilà.

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).

## Local development setup

The development and testing with the documentation has been connected so we not only can utilize Material Design examples,
but all of the original Bootstrap documentation examples as well.  The most productive environment so far is to have
Bootstrap checked out in parallel to this project, running three (3) different terminal commands simultaneously:

1. _Terminal 1_: Bootstrap documentation for reference 
  
    1. Performs an initial dependency setup/build
    
        `bundle install && npm install && bower install && grunt dist`
      
    1. Start serving the documentation on <http://localhost:9000>
      
        `jekyll serve` 
    
1. _Terminal 2_: Initial build and watch

    1. Performs an initial dependency setup/build
    
        `bundle install && npm install && bower install && grunt dist`
         
    1. Watch both the core and docs sources for changes
    
        `grunt watch` 

1. _Terminal 3_: Start serving documentation on <http://localhost:9001> with `jekyll serve`
    
Now go forth and develop, the `watch` task will keep tabs on source files and docs files, meanwhile the `jekyll serve` command 
will generate new documentation pages with the changes.  Simply refresh your browser to see the changes. 

(TODO: someone please investigate adding autoreload to jekyll development cycle)   

## Troubleshooting

Should you encounter problems with installing dependencies or running Grunt commands, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

[ruby-sass]: https://github.com/sass/sass
[grunt-contrib-sass]: https://github.com/gruntjs/grunt-contrib-sass
[libsass]: https://github.com/sass/libsass
[grunt-sass]: https://github.com/sindresorhus/grunt-sass
[autoprefixer]: https://github.com/postcss/autoprefixer
