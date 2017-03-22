import {
  Preset,
  Clean,
  Copy,
  Jekyll,
  CssNano,
  Prepublish,
  PublishBuild,
  PublishGhPages,
  Sass,
  RollupUmd,
  RollupIife,
  ScssLint,
  EsLint,
  Aggregate,
  Uglify,
  series,
  parallel,
  File
} from 'gulp-pipeline'
import gulp from 'gulp'
import pkg from './package.json'
import moment from 'moment'
import gulpDocs from './gulpfile.babel.docs'

// we have a lot of aggregates, which add listeners
gulp.setMaxListeners(20)

// When converting non-modular dependencies into usable ones using rollup-plugin-commonjs, if they don't have properly read exports add them here.
const node_modules = File.findup('node_modules')
let namedExports = {}
//namedExports[`${node_modules}/corejs-typeahead/dist/bloodhound.js`] = ['Bloodhound']
//namedExports[`${node_modules}/anchor-js/anchor.js`] = ['AnchorJS']

const rollupConfig = {
  debug: false,
  options: {
    moduleName: 'BMD',
    external: [
      'jquery',
      'anchor-js',
      'clipboard'
    ],
    globals: {
      'anchor-js': 'anchors',
      clipboard: 'Clipboard'
    },
    banner: `/*!
  * ${pkg.name}  v${pkg.version} (${pkg.homepage})
  * Copyright ${moment().format("YYYY")} ${pkg.author} and contributors
  * Licensed under ${pkg.license}
  */`
  },
  commonjs: {
    options: {
      namedExports: namedExports,
    }
  }
}

const preset = Preset.baseline()

const copyJsToDocs = new Copy(gulp, preset, {
  task: {name: 'dist:js-docs'},
  source: {
    options: {cwd: 'dist'},
    glob: ['*.iife*.js']
  },
  dest: 'docs/dist/'
})

const copyCssToDocs = new Copy(gulp, preset, {
  task: {name: 'dist:css-docs'},
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
      new RollupUmd(gulp, preset, rollupConfig, {
        options: {
          dest: 'bootstrap-material-design.umd.js'
        }
      }),
      new RollupIife(gulp, preset, rollupConfig, {
        options: {
          dest: 'bootstrap-material-design.iife.js'
        }
      })
    ),
    new Uglify(gulp, preset, {
      task: {name: 'iife:uglify'},
      source: {glob: '*.iife.js'}
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
let docsDefaultRecipes = gulpDocs(gulp, preset, {rollupConfig: rollupConfig})


// all - both core and docs
const all = new Aggregate(gulp, 'all',
  parallel(gulp,
    defaultRecipes,
    docsDefaultRecipes
  )
)

// publish
new Aggregate(gulp, 'publish',

  series(gulp,
    new Prepublish(gulp, preset),   // asserts committed

    all,

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
      options: {
        remote: {
          repo: 'git@github.com:rosskevin/bootstrap-material-design.git' // FIXME: temporary, remove this option when we are deploying to our home repo
        }
      }
    })
  )
)
