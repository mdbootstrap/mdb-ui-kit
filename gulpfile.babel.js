import {Preset, Clean, Copy, Jekyll, CssNano, Prepublish, PublishBuild, PublishGhPages, Sass, RollupEs, RollupUmd, RollupIife, ScssLint, EsLint, Aggregate, Uglify, series, parallel} from 'gulp-pipeline'

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
    glob: ['*.iife*.js']
  },
  dest: 'docs/dist/'
})

const copyCssToDocs = new Copy(gulp, preset, {
  task: {name: 'dist:css->docs'},
  source: {
    options: {cwd: 'dist'},
    glob: ['*.css']
  },
  dest: 'docs/dist/'
})

const js = new Aggregate(gulp, 'js',
  series(gulp,
    new EsLint(gulp, preset),
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
    new Uglify(gulp, preset, {
      task: {name: 'iife:uglify'},
      source: { glob: '*.iife.js' }
    }),

    copyJsToDocs
  )
)

const css = new Aggregate(gulp, 'css',
  series(gulp,
    new ScssLint(gulp, preset),
    new Sass(gulp, preset),
    new CssNano(gulp, preset),
    copyCssToDocs
  )
)

const defaultRecipes = new Aggregate(gulp, 'default', series(gulp,
  new Clean(gulp, preset),
  parallel(gulp,
    css,
    js
  )
))

// load all docs tasks
let docsDefaultRecipes = gulpDocs(gulp, {rollupConfig: rollupConfig})

// publish
new Aggregate(gulp, 'publish',

  series(gulp,
    new Prepublish(gulp, preset),   // asserts committed

    defaultRecipes,

    docsDefaultRecipes,

    // ^^^docs:default cleans docs/dist, so we need to re-copy dist to docs in this scenario
    parallel(gulp, copyCssToDocs, copyJsToDocs),

    new Jekyll(gulp, preset, {options: {raw: 'baseurl: "/bootstrap-material-design"'}}),

    new PublishBuild(gulp, preset, {
      npm: {
        bump: false,
        publish: false
      }
    }),

    new PublishGhPages(gulp, preset, {
      debug: true,
      options: {
        remote: {
          repo: 'git@github.com:rosskevin/bootstrap-material-design.git' // FIXME: temporary, remove this option when we are deploying to our home repo
        }
      }
    })
  )
)

