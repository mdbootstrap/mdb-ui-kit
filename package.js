// package metadata file for Meteor.js
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
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.use('twbs:bootstrap@3.3.1');
  api.use('jquery');
  api.addFiles([
    // we bundle all font files, but the client will request only one of them via the CSS @font-face rule
    'dist/fonts/Material-Design-Icons.eot',  // IE8 or older
    'dist/fonts/Material-Design-Icons.svg',  // SVG fallback for iOS < 5 - http://caniuse.com/#feat=svg-fonts, http://stackoverflow.com/a/11002874/126903
    'dist/fonts/Material-Design-Icons.ttf',  // Android Browers 4.1, 4.3 - http://caniuse.com/#feat=ttf
    'dist/fonts/Material-Design-Icons.woff', // Supported by all modern browsers
    'dist/css/material-wfont.css',           // includes @font-face rules to load the Roboto font
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
