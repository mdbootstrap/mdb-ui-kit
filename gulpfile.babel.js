import {Preset, Clean, Copy, Jekyll, CssNano, Prepublish, PublishBuild, PublishGhPages, Sass, RollupEs, RollupUmd, RollupIife, ScssLint, EsLint, Aggregate, Uglify, series, parallel} from 'gulp-pipeline/src/index'
import gulp from 'gulp'
import findup from 'findup-sync'
import pkg from './package.json'
import moment from 'moment'
import gulpDocs from './gulp-docs'

const node_modules = findup('node_modules')

// we have a lot of aggregates, which add listeners
gulp.setMaxListeners(20)

const preset = Preset.baseline({
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
  },
  postProcessor: {
    dest: 'dist' //'dist/digest'
  }
})


// When converting non-modular dependencies into usable ones using rollup-plugin-commonjs, if they don't have properly read exports add them here.
let namedExports = {}
//namedExports[`${node_modules}/corejs-typeahead/dist/bloodhound.js`] = ['Bloodhound']
//namedExports[`${node_modules}/anchor-js/anchor.js`] = ['AnchorJS']

const rollupConfig = {
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

const copyJsToDocs = new Copy(gulp, preset, {
  task: {name: 'dist:js->docs'},
  source: {
    options: {cwd: 'dist'},
    glob: ['*.iife.js']
  },
  dest: 'docs/dist/'
})

const javascripts = series(gulp,
  parallel(gulp,
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
    })
  ),
  copyJsToDocs
)

let eslint = new EsLint(gulp, preset)
let scsslint = new ScssLint(gulp, preset)
const copyCssToDocs = new Copy(gulp, preset, {
  task: {name: 'dist:css->docs'},
  source: {
    options: {cwd: 'dist'},
    glob: ['*.css']
  },
  dest: 'docs/dist/'
})

const sass = series(gulp,
  new Sass(gulp, preset),
  new CssNano(gulp, preset),
  copyCssToDocs
)
let linters = parallel(gulp, scsslint, eslint)

let recipes = series(gulp,
  new Clean(gulp, preset),
  linters,
  parallel(gulp,
    sass,
    javascripts
  )
)

new Aggregate(gulp, 'default', recipes)
new Aggregate(gulp, 'lint', linters)
new Aggregate(gulp, 'js', series(gulp, eslint, javascripts))
new Aggregate(gulp, 'css', series(gulp, scsslint, sass))


let docsDefaultRecipes = gulpDocs(gulp, {rollupConfig: rollupConfig})

const buildControlConfig = {
  options: { // see https://github.com/alienfast/build-control/blob/master/src/buildControl.js#L11
    //branch: 'v4-dist'
  }
}


const prepRelease = series(gulp,
  new Prepublish(gulp, preset),   // asserts committed
  recipes,
  docsDefaultRecipes, // this cleans docs, so we need to re-copy dist to docs in this scenario
  parallel(gulp, copyCssToDocs, copyJsToDocs),
  new Jekyll(gulp, preset, {options: {raw: 'baseurl: "/bootstrap-material-design"'}})
)

new Aggregate(gulp, 'prepRelease', prepRelease)

new Aggregate(gulp, 'publish', series(gulp,
  prepRelease,
  new PublishBuild(gulp, preset),
  new PublishGhPages(gulp, preset, {
    options: {
      remote: {
        repo: 'git@github.com:rosskevin/bootstrap-material-design.git' // FIXME: temporary, remove this option when we are deploying to our home repo
      }
    }
  })
))

