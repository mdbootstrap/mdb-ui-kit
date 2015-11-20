/*!
 * BMD Grunt task for Glyphicons data generation
 */
'use strict';

var fs = require('fs');

module.exports = function generateGlyphiconsData(grunt) {
  // Pass encoding, utf8, so `readFileSync` will return a string instead of a buffer
  var iconsFile = fs.readFileSync('less/_icons-material-design.less', 'utf8');
  var iconsLines = iconsFile.split('\n');

  // Use any line that starts with ".glyphicon-" and capture the class name
  var iconClassRegex = /^\.(mdi-[a-zA-Z0-9-]+):before/;
  var iconsData = '# This file is generated via Grunt task. **Do not edit directly.**\n' +
                       '# See the \'build-icons-data\' task in Gruntfile.js.\n\n';
  var iconsYml = 'docs/_data/icons.yml';
  for (var i = 0, len = iconsLines.length; i < len; i++) {
    var match = iconsLines[i].match(iconClassRegex);

    if (match !== null) {
      iconsData += '- ' + match[1] + '\n';
    }
  }

  // Create the `_data` directory if it doesn't already exist
  if (!fs.existsSync('docs/_data')) {
    fs.mkdirSync('docs/_data');
  }

  try {
    fs.writeFileSync(iconsYml, iconsData);
  } catch (err) {
    grunt.fail.warn(err);
  }
  grunt.log.writeln('File ' + iconsYml.cyan + ' created.');
};
