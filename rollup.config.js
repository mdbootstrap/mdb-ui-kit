import fs from 'fs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';

const babelOptions = JSON.parse(fs.readFileSync('./.babelrc'));

export default {
  output: {
    format: 'umd',
  },
  globals: {
    jquery: 'jQuery',
    'popper.js': 'Popper',
  },
  external: ['jquery', 'popper.js'],
  plugins: [
    babel({
      externalHelpersWhitelist: [
        // Include only required helpers
        'defineProperties',
        'createClass',
        'inheritsLoose',
        'extends',
      ],
    }),
    resolve({
      module: true,
    }),
    cjs({
      include: ['node_modules/bootstrap/**', 'node_modules/jquery/**'],
      namedExports: {
        'node_modules/jquery/dist/jquery.js': 'jquery',
      },
    }),
  ],
};
