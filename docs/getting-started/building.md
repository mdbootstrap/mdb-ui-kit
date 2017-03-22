---
layout: docs
title: Building
group: getting-started
---

Material Design for Bootstrap uses [Gulp v4](http://gulpjs.com) for its CSS and JavaScript build system and Jekyll for the written documentation. Our gulpfile includes convenient methods for working with the framework, including compiling code, running tests, and more.

## Tooling setup

To use our gulpfile and run our documentation locally, you'll need a copy of Material Design for Bootstrap's source files, Node, and Gulp v4. Follow these steps and you should be ready to rock:

1. [Download and install Node](https://nodejs.org/download), which we use to manage our dependencies.
2. Install the Gulp command line tools, `gulp-cli`, with `npm install -g gulpjs/gulp-cli#4.0`.
3. Navigate to the root `/bootstrap-material-design` directory and run `npm install` to install our local dependencies listed in [package.json](https://github.com/FezVrasta/bootstrap-material-design/blob/master/package.json).
4. [Install RVM](http://rvm.io/rvm/install)
5. Install ruby. `cd bootstrap-material-design` and if installation is needed, it will give an install command such as `To install do: 'rvm install ruby-2.x.x'`
6. Install Bundler with `gem install bundler`
7. Finally run `bundle install`. This will install all Ruby dependencies, such as Jekyll and plugins.
  - **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.

When completed, you'll be able to run the various Gulp commands provided from the command line to view them run `gulp --tasks`

## Using Gulp

Our gulpfile includes the many tasks you can view with `gulp --tasks`, here are the important ones:

| Task | Description |
| --- | --- |
| `gulp` | runs the `default` task that builds all core files to the `dist` directory |
| `gulp docs:default` | creates all the `docs/dist` files needed to support the documentation |
| `gulp all` | runs the `default` and `docs:default` tasks |
| `gulp publish` | Run all, publish dist, npm, and gh-pages |


## Local documentation

Running our documentation locally requires the use of Jekyll, a flexible static site generator that provides us basic includes, 
markdown-based files, templates, and more. Here's how to get it started:

1. Run through the [tooling setup](#tooling-setup) above to install Jekyll (the site builder) and other Ruby dependencies with `bundle install`.
2. From the root `/bootstrap-material-design` directory, run `bundle exec jekyll serve` in the command line.
3. Open <http://localhost:9000> in your browser, and voilà.

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).

## Local development setup

The development and testing with the documentation has been connected so we not only can utilize Material Design examples,
but all of the original Bootstrap documentation examples as well.  The most productive environment so far is to have
Bootstrap checked out in parallel to this project, running two (2) different terminal commands simultaneously:

1. _Terminal 1_: Initial build and watch

    1. Performs an initial dependency setup/build
    
        `bundle install && npm install && gulp default && gulp docs:default`
         
    1. Watch both the core and docs sources for changes and build to the docs site
    
        `gulp docs:default:watch` 

1. _Terminal 2_: Start serving documentation on <http://localhost:9000> with `jekyll serve`
    
Now go forth and develop, the `docs:default:watch` task will keep tabs on source files and docs files, meanwhile the `jekyll serve` command will generate new documentation pages with the changes.  Simply refresh your browser to see the changes. 

(TODO: someone please investigate adding autoreload to jekyll development cycle)   

## Troubleshooting

Should you encounter problems with installing dependencies or running Gulp commands, uninstall all previous dependency versions (global and local). Then, rerun `rm -Rf node_modules && npm install`.
