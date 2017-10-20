# Hacking Material Design for Bootstrap

This project makes use Rollup and node-sass to build its assets.

To watch all the files and get the compiled ones in the `dist/` folder, just run:

```
npm run watch
```

You can also watch CSS or JS individually running:

```
npm run watch:css
# or
npm run watch:js
```

To trigger the relative task and run it.

If you desire to compile the project for production, genering also the minified versions of it, run:

```
npm run build
```

Or if you prefer to compile only CSS or JS individually without minification:

```
npm run build:css
# or
npm run build:js
```

If you desire them to be minified, instead, run:


```
npm run build:css-min
# or
npm run build:js-min
```

To compile and minify the files.
