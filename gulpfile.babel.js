import babelify from 'babelify'
import browserify from 'browserify'
import gulp from 'gulp'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import source from 'vinyl-source-stream'
import streamify from 'gulp-streamify'
import uglify from 'gulp-uglify'
import watchify from 'watchify'

const args = require('yargs').argv

gulp.task('build', function() {
  var build = browserify('src/Application.jsx', {
    fullPaths: args.watch,
    debug: args.debug
  })

  if (args.watch)
    build = watchify(build)

  build.transform(babelify)

  var bundle = function() {
    let bundle = build.bundle()
      .pipe(source('bundle.js'))
      .pipe(rename('bundle.min.js'));
    if (!args.debug)
      bundle = bundle.pipe(streamify(uglify()))
    return bundle.pipe(gulp.dest('build'))
  }

  build.on('update', bundle)
  return bundle()
})

gulp.task('default', ['build'])
