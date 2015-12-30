
import config from './rollup.config';

config.format = 'umd';
config.moduleName = 'bootstrapMaterialDesign';
config.dest = 'dist/js/bootstrap-material-design.umd.js';

export default config;
