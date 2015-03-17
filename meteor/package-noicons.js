// package metadata file for Meteor.js
'use strict';

var packageName = 'fezvrasta:bootstrap-material-design-noicons';  // https://atmospherejs.com/fezvrasta/bootstrap-material-design-noicons
var where = 'client';  // where to install: 'client' or 'server'. For both, pass nothing.

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'FezVrasta\'s Bootstrap theme implementing Google\'s Material Design (Paper Elements). No icons.',
  version: packageJson.version,
  git: 'https://github.com/fezvrasta/bootstrap-material-design.git'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.use('twbs:bootstrap-noglyph@3.3.1');
  api.use('jquery');
  api.addFiles([
    'dist/css/material.css',           // includes @font-face rules to load the Roboto font
    'dist/css/ripples.css',
    'dist/js/material.js',
    'dist/js/ripples.js',
    'meteor/init.js'
  ], where);
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use(['tinytest', 'http'], where);

  api.addFiles('meteor/test-noicons.js', where);
});
