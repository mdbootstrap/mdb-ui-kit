// package metadata file for Meteor.js

/* jshint strict:false */
/* global Package:true */
/* global Npm:true */

var packageName = 'fezvrasta:bootstrap-material-design';  // https://atmospherejs.com/fezvrasta/bootstrap-material-design
var where = 'client';  // where to install: 'client' or 'server'. For both, pass nothing.
var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'Bootstrap Material Design',
  version: packageJson.version,
  git: 'https://github.com/fezvrasta/bootstrap-material-design.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2');
  api.use('twbs:bootstrap@4.0.0-alpha');
  api.use('jquery', 'client');
  api.addFiles([
    'dist/css/bootstrap-material-design.css',
    'dist/js/bootstrap-material-design.js'
  ], where);
});
