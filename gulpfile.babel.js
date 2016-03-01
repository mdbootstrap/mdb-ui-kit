import {Preset, Clean, MinifyCss, Sass, RollupEs, RollupUmd, RollupIife, ScssLint, EsLint, TaskSeries} from 'gulp-pipeline/src/index'

// debug the project source - remove for repo
//import {Clean, CleanDigest, Images, MinifyCss, Sass, RollupIife, ScssLint, EsLint, Rev, TaskSeries} from 'gulp-pipeline'
//import Preset from '../../../gulp-pipeline/src/preset'
import extend from 'extend'

import stringify from 'stringify-object'
import gulp from 'gulp'
import findup from 'findup-sync'
const node_modules = findup('node_modules')


let preset = Preset.baseline({
  javascripts: {
    source: { options: {cwd: 'js/src'}},
    watch: {options: {cwd: 'js/src'}},
    test: {options: {cwd: 'js/tests'}}
  },
  stylesheets: {
    source: {options: {cwd: 'scss'}},
    watch: {options: {cwd: 'scss'}}
  },
  images: {
    source: {options: {cwd: 'images'}},
    watch: {options: {cwd: 'images'}}
  }
})


// When converting non-modular dependencies into usable ones using rollup-plugin-commonjs, if they don't have properly read exports add them here.
let namedExports = {}
//namedExports[`${node_modules}/corejs-typeahead/dist/bloodhound.js`] = ['Bloodhound']

let rollupConfig = {
  commonjs: {
    options: {
      namedExports: namedExports
    }
  }
}

let rollups = [
  new RollupEs(gulp, preset, extend(true, {}, rollupConfig, {options: {dest: 'bootstrap-material-design.es.js'}})),
  new RollupUmd(gulp, preset, extend(true, {}, rollupConfig, {options: {dest: 'bootstrap-material-design.umd.js', moduleName: 'bootstrapMaterialDesign'}})),
  new RollupIife(gulp, preset, extend(true, {}, rollupConfig, {options: {dest: 'bootstrap-material-design.iife.js', moduleName: 'bootstrapMaterialDesign'}})),
]

let eslint = new EsLint(gulp, preset)
let scsslint = new ScssLint(gulp, preset)
let sass = new Sass(gulp, preset, {debug: true})
let lint = [scsslint, eslint]

// instantiate ordered array of recipes (for each instantiation the tasks will be created e.g. sass and sass:watch)
let recipes = [
  new Clean(gulp, preset),
  lint,
  [
    sass,
    rollups
  ]
]

// Simple helper to create the default and watch tasks as a sequence of the recipes already defined
new TaskSeries(gulp, 'default', recipes)
new TaskSeries(gulp, 'lint', lint)
new TaskSeries(gulp, 'js', [eslint, rollups])
new TaskSeries(gulp, 'css', [scsslint, sass])
