import {Preset, Clean, Copy, Jekyll, MinifyCss, Prepublish, PublishBuild, Sass, RollupEs, RollupUmd, RollupIife, ScssLint, EsLint, TaskSeries, Uglify} from 'gulp-pipeline/src/index'
import gulp from 'gulp'
import findup from 'findup-sync'
import pkg from './package.json'
import moment from 'moment'
import gulpDocs from './gulp-docs'

const node_modules = findup('node_modules')

let preset = Preset.baseline({
  javascripts: {
    source: {options: {cwd: 'js/src'}},
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
//namedExports[`${node_modules}/anchor-js/anchor.js`] = ['AnchorJS']

let rollupConfig = {
  //debug: true,
  options: {
    external: [
      'anchor-js',
      'clipboard'
    ],
    globals: {
      'anchor-js': 'anchors',
      clipboard: 'Clipboard'
    },
    banner: `/*!
  * Bootstrap Material Design v${pkg.version} (${pkg.homepage})
  * Copyright 2014-${moment().format("YYYY")} ${pkg.author}
  * Licensed under MIT (https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE)
  */`
  },
  commonjs: {
    options: {
      namedExports: namedExports,
    }
  }
}

let rollups = [
  new RollupEs(gulp, preset, rollupConfig, {options: {dest: 'bootstrap-material-design.es.js'}}),
  new RollupUmd(gulp, preset, rollupConfig, {
    options: {
      dest: 'bootstrap-material-design.umd.js',
      moduleName: 'bootstrapMaterialDesign'
    }
  }),
  new RollupIife(gulp, preset, rollupConfig, {
    options: {
      dest: 'bootstrap-material-design.iife.js',
      moduleName: 'bootstrapMaterialDesign'
    }
  }),
]

let eslint = new EsLint(gulp, preset)
let scsslint = new ScssLint(gulp, preset)
let sass = new Sass(gulp, preset)
let linters = [scsslint, eslint]

new TaskSeries(gulp, 'default', [
  new Clean(gulp, preset),
  linters,
  [
    sass,
    rollups
  ],
  new MinifyCss(gulp, preset)
])
new TaskSeries(gulp, 'lint', linters)
new TaskSeries(gulp, 'js', [eslint, rollups])
new TaskSeries(gulp, 'css', [scsslint, sass])


gulpDocs(gulp, {rollupConfig: rollupConfig})


//
let prepRelease = new TaskSeries(gulp, 'prep-release', [
  new Prepublish(gulp, preset),
  'default',
  'docs:default',
  new Copy(gulp, preset, {
    task: {name: 'copy:dist-to-docs'},
    source: {
      options: {cwd: 'dist'},
      glob: ['js/*.iife*', 'css/*.*']
    },
    dest: 'docs/dist/'
  }),
  new Jekyll(gulp, preset, {options: {raw: 'baseurl: "/bootstrap-material-design"'}})
])


new TaskSeries(gulp, 'publish', [
  prepRelease,
  new PublishBuild(gulp, preset, {
    npm: {
      bump: false,
      publish: false
    }
  })
])
