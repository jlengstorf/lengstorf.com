/*
 * # Build Pipeline for code.lengstorf.com
 * This gulpfile is heavily influenced by the Sage WordPress theme.
 * See https://github.com/roots/sage/blob/master/gulpfile.js for more info.
 */
const gulp = require('gulp');
const path = require('path');

/*
 * ## Load Dependencies for Processing Assets
 */
const lazypipe = require('lazypipe');
const changed = require('gulp-changed');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rev = require('gulp-rev');
const browserSync = require('browser-sync');
const merge = require('merge-stream');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const imagemin = require('gulp-imagemin');

/*
 * ## Create a Simple Error Handler for Use With Plumber
 */
const handleError = err => {
  console.error(err.message);
};

/*
 * ## Use the Asset Builder to Create Site Assets
 * See https://github.com/austinpray/asset-builder for details.
 */
const manifest = require('asset-builder')('./source/asset-manifest.json');

/*
 * ## Set Options Based on CLI Args
 */
const argv = require('minimist')(process.argv.slice(2));
const enabled = {

  /*
   * ### If the `--production` flag is set, we handle a few things differently.
   * Enable file revisions.
   */
  rev: argv.production,

  // Disable source maps.
  maps: !argv.production,

  // Minify files.
  min: argv.production,

  // Fail on style errors
  failStyleTask: argv.production,

  // Fail on pug errors
  failTemplateTask: argv.production,
};

/*
 * ## Convert Pug Files to HTML
 * Pug used to be called Jade. It's a faster way to write HTML.
 */
const pug = require('gulp-pug');
gulp.task('pug', () => {
  gulp.src(manifest.config.pug.source, { cwd: manifest.paths.source })
    .pipe(gulpif(!enabled.failTemplateTask, plumber(handleError)))
    .pipe(pug({
      basedir: path.resolve(__dirname),
      filters: [
        require('jstransformer-marked'),
      ],
    }))
    .pipe(changed(manifest.config.pug.dest, {
      extension: '.html',
      hasChanged: changed.compareSha1Digest,
    }))
    .pipe(gulp.dest(manifest.config.pug.dest));
});

/*
 * ## Process Stylesheets
 */
const styleTasks = (filename) => {
  const processors = [

    // - [`postcss-import`](http://git.io/vUQ0p) for `@import` support
    require('postcss-import')({ glob: true }),

    // - [`postcss-mixins`](http://git.io/vUBKn) allows Sass-style mixins
    require('postcss-mixins')({
      mixinsDir: process.cwd() + '/source/scripts/postcss/mixins/',
    }),

    // - [`postcss-nested`](http://git.io/vUBoT) allows nested selectors
    require('postcss-nested'),

    // - [`postcss-simple-vars`](http://git.io/vUBKX) allows Sass-style vars
    require('postcss-simple-vars'),

    // - [`postcss-simple-vars`](http://git.io/vUBKX) allows Sass-style vars
    require('postcss-cssnext')(),

    // - [`postcss-simple-vars`](http://git.io/vUBKX) allows Sass-style vars
    require('cssnano')({ safe: true, autoprefixer: false }),
  ];

  return lazypipe()

    // Enables plumber if enabled to avoid failing on an error in this task.
    .pipe(() => gulpif(!enabled.failStyleTask, plumber()))

    // Enables sourcemaps if they're enabled.
    .pipe(() => gulpif(enabled.maps, sourcemaps.init()))

    // Run PostCSS to allow future CSS syntax without compatibility issues.
    .pipe(require('gulp-postcss'), processors)

    // Concatenate all files into a single file with the passed filename.
    .pipe(concat, filename)

    // Revision the generated file if that's enabled.
    .pipe(() => gulpif(enabled.rev, rev()))

    .pipe(() => gulpif(enabled.maps, sourcemaps.write('.', {
      sourceRoot: 'static/assets/styles/',
    })))();
};

/*
 * ## Write to the Rev Manifest
 */
const revManifest = manifest.paths.dist + 'assets.json';
const writeToManifest = (directory) => lazypipe()
  .pipe(gulp.dest, manifest.paths.dist + directory)
  .pipe(browserSync.stream, { match: '**/*.{js,css}' })
  .pipe(rev.manifest, revManifest, {
    base: manifest.paths.dist,
    merge: true,
  })
  .pipe(gulp.dest, manifest.paths.dist)();

/*
 * ## Create the Gulp Tasks
 */
gulp.task('styles', [], () => {
  const merged = merge();
  manifest.forEachDependency('css', (dep) => {
    const styleTasksInstance = styleTasks(dep.name);

    if (!enabled.failStyleTask) {
      styleTasksInstance.on('error', handleError);
    }

    merged.add(
      gulp.src(dep.globs, { base: 'styles' })
        .pipe(styleTasksInstance)
    );
  });

  return merged.pipe(writeToManifest('styles'));
});

gulp.task('styles:watch', (callback) => {
  runSequence(
    'styles',
    'pug',
    callback
  );
});

/*
 * ## Process JavaScript
 */
const scriptTasks = filename => lazypipe()
  .pipe(() => gulpif(enabled.maps, sourcemaps.init()))
  .pipe(webpackStream, {
    resolve: {
      modulesDirectories: ['static/vendor', 'node_modules'],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
    ],
  })
  .pipe(concat, filename)
  .pipe(() => gulpif(enabled.rev, rev()))
  .pipe(() => gulpif(enabled.maps, sourcemaps.write('.', {
    sourceRoot: 'assets/scripts/',
  })))();

gulp.task('scripts', ['scripts:test'], () => {
  const merged = merge();
  manifest.forEachDependency('js', dep => {
    merged.add(
      gulp.src(dep.globs, { base: 'scripts' })
        .pipe(scriptTasks(dep.name))
    );
  });

  return merged.pipe(writeToManifest('scripts'));
});

gulp.task('scripts:test', () => gulp.src(['gulpfile.js', manifest.paths.source + 'scripts/**/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')))
);

/*
 * ## Compress Images Losslessly
 */
gulp.task('images', () => gulp.src(manifest.globs.images)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{ removeUnknownsAndDefaults: false }, { cleanupIDs: false }],
    }))
    .pipe(gulp.dest(manifest.paths.dist + 'images'))
    .pipe(browserSync.stream())
);

/*
 * ## Set Up File Watching for Development
 */
gulp.task('watch', () => {
  browserSync.init({
    open: 'external',
    host: manifest.config.devUrl,
    port: 8100,
  });

  console.log(`Current env: ${argv.production ? 'production' : 'development'}`);

  gulp.watch([manifest.paths.source + 'styles/**/*'], ['styles:watch']);
  gulp.watch([manifest.paths.source + 'scripts/**/*'], ['scripts']);
  gulp.watch([manifest.paths.source + 'images/**/*'], ['images']);

  // Hugo server already reloads, so we don't need to watch templates.
  gulp.watch([manifest.paths.source + 'templates/**/*'], ['pug']);
});
