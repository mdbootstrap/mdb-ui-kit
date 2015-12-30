
import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/rollup.umd.config.js';
config.moduleName = 'bootstrapMaterialDesign';

export default config;
