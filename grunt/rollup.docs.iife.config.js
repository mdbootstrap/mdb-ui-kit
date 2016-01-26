import config from './rollup.config.js';
import extend from 'extend'
import babel from 'rollup-plugin-babel';

export default extend(true, config, {
  plugins: [babel()],
  format: 'iife',
  entry: 'docs/assets/js/src/index.js',
  dest: 'docs/dist/js/docs.iife.js'
})
