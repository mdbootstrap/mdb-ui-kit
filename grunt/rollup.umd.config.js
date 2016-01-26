import config from './rollup.config.js';
import extend from 'extend'
import babel from 'rollup-plugin-babel';

export default extend(true, config, {
  plugins: [babel()],
  format: 'umd',
  dest: 'dist/js/bootstrap-material-design.umd.js'
})
