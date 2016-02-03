'use strict';
$ =jQuery.noConflict();

//var packageName;  // there seems to be no official way of finding out the name of the very package we're testing - http://stackoverflow.com/questions/27180709/in-a-tinytest-test-file-how-do-i-get-the-name-of-the-package
//
//// Check that the font files are downloadable. Meteor places assets at /packages/<packageName>/.
//// Only 'woff' for now, but 'woff2' may become available - https://github.com/FortAwesome/Font-Awesome/pull/5062#discussion_r20936453
//['eot', 'svg', 'ttf', 'woff'].forEach(function (font) {
//  Tinytest.addAsync(font + ' fonts are shipped', function (test, done) {
//
//    // curiously enough, the 'local-test:...' package isn't loaded into Package before calling Tinytest, so we can't do this determination outside this loop
//    if (!packageName)
//      Object.keys(Package).forEach(function(p) {
//        if (p.search(/local-test/) > -1)
//          packageName = p.replace('local-test:', '');  // we should stop the loop, but forEach can't do that
//      })
//
//    if (!packageName) {
//      test.exception({message: 'Package not quite loaded... go figure'});
//      return
//    }
//
//    var packagePath = packageName.replace(':', '_')  // e.g. meteorpackaging_bootstrap-material-design
//
//    HTTP.get(
//      '/packages/' + packagePath + '/dist/fonts/Material-Design-Icons.' + font,
//      {
//         headers: {
//           'Cache-Control': 'no-cache'  // because Meteor has cached fonts even after they were removed from package.js (!) - https://github.com/meteor/meteor/issues/3196
//         }
//      },
//      function callback(error, result) {
//        if (error) {
//          test.fail({message: 'Font failed to load'});
//        } else {
//          // if the file is 404, Meteor will redirect to / and return the Meteor.js boilerplate
//          test.isTrue(result.content.length > 100000, font + ' font could not be downloaded');
//        }
//
//        done();
//      }
//    );
//  });
//})

var plugins = ['affix', 'alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'popover', 'scrollspy', 'tab', 'tooltip'];

document.addEventListener('DOMContentLoaded', function() {
    // test plugins
    plugins.forEach(function (plugin) {
      Tinytest.add('Plugin - ' + plugin, function (test) {
        test.instanceOf($(document.body)[plugin], Function, 'instantiated correctly');
      });
    });

    // visual check
    plugins.forEach(function (plugin) {

      Tinytest.addAsync('Visual check - ' + plugin, function (test, done) {
        var bootstrapDropZone = document.createElement('div');
        document.body.appendChild(bootstrapDropZone);


        HTTP.get('http://rawgit.com/twbs/bootstrap/master/js/tests/visual/' + plugin + '.html', function callback(error, result) {
          if (error) {
            test.fail('Error getting the test file. Do we have an Internet connection to rawgit.com?');
          } else {
            // [^] matches across newlines. Stay within the container div, or else the fragment will attempt to load resources on its own.
            bootstrapDropZone.innerHTML = result.content.match(/<div[^]+<\/div>/);
            test.ok({message: 'Test passed if the display looks OK *and* clicking dropdowns/popovers/tooltips works.'});
          }

          done();
        });

      });

    });


    Tinytest.addAsync('Visual check - Material Design', function (test, done) {
      var bootstrapDropZone = document.createElement('div');
      document.body.appendChild(bootstrapDropZone);

      HTTP.get('http://rawgit.com/FezVrasta/bootstrap-material-design/master/bootstrap-elements.html', function callback(error, result) {
        if (error) {
          test.fail('Error getting the FezVrasta test file. Do we have an Internet connection to rawgit.com?');
        } else {
          // [^] matches across newlines. Stay within the container div, or else the fragment will attempt to load resources on its own.
          bootstrapDropZone.innerHTML = result.content.match(/<meta name="viewport"[^]+<script src=/);
          test.ok({message: 'Test passed if the display looks OK *and* clicking dropdowns/popovers/tooltips works.'});
          // only does anything after loading the 'dropdown' plugin test
          $('[data-toggle="dropdown"]').dropdown();
          // only does anything after loading the 'popover' plugin test
          $('[data-toggle="popover"]').popover();
          // only does anything after loading the 'tooltip' plugin test
          $('[data-toggle="tooltip"]').tooltip();
          // don't initialize the modals because that messes up the Tinytest runner HTML
          $.material.init();
        }

        done();
      });

    });

});
