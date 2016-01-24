import config from './rollup.config.js';
import extend from 'extend'

export default extend(true, config, {
  format: 'es6',
  dest: 'dist/js/bootstrap-material-design.es2015.js'
})
