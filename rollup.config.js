import babel from 'rollup-plugin-babel';

//var external = Object.keys( require( './package.json' ).dependencies );

export default {
  entry: 'js/src/index.js',
  plugins: [babel()]
  //external: external
};
