// package metadata file for Meteor.js

/* jshint strict:false */
/* global Package:true */
/* global Npm:true */
'use strict';

var packageName = 'fezvrasta:bootstrap-material-design';  // https://atmospherejs.com/fezvrasta/bootstrap-material-design
var where = 'client';  // where to install: 'client' or 'server'. For both, pass nothing.

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'FezVrasta\'s Bootstrap theme implementing Google\'s Material (Paper) Design',
  version: packageJson.version,
  git: 'https://github.com/fezvrasta/bootstrap-material-design.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2');
  api.use('twbs:bootstrap@3.3.6');
  api.use('jquery');
  api.addFiles([
    'dist/css/bootstrap-material-design.css',
    'dist/css/ripples.css',
    'dist/js/material.js',
    'dist/js/ripples.js',
    'meteor/init.js'
  ], where);
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use(['tinytest', 'http'], where);

  api.addFiles('meteor/test.js', where);
});
