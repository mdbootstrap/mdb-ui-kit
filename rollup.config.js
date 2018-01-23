import fs from 'fs';
import babel from 'rollup-plugin-babel';

const babelOptions = JSON.parse(fs.readFileSync('./.babelrc'));

export default {
  output: {
    format: 'umd',
  },
  globals: {
    jquery: 'jQuery',
    'popper.js': 'Popper'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', // Only transpile our source code
      externalHelpersWhitelist: [ // Include only required helpers
        'defineProperties',
        'createClass',
        'inheritsLoose',
        'extends'
      ]
    })
  ],
};
