import fs from 'fs';
import babel from 'rollup-plugin-babel';

const babelOptions = JSON.parse(fs.readFileSync('./.babelrc'));

export default {
  output: {
    format: 'iife',
  },
  plugins: [
    babel(Object.assign(babelOptions, { babelrc: false })),
  ],
};
