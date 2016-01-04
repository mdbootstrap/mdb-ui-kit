import config from './rollup.config.js';

config.format = 'iife';
config.entry = 'docs/assets/js/src/index.js',

config.dest = 'docs/dist/js/docs.iife.js';

export default config;
