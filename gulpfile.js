var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var htmlMin = require('gulp-htmlmin');
var notify = require('gulp-notify');

var htmlFile = ['./public/assets/*.html'];

// Minify HTML
gulp.task('html:minify', function() {
  return gulp.src(htmlFile)
  .pipe(htmlMin({
    collapseWhitespace:true
  }))
  .on("error", notify.onError("Error: <%= error.message %>"))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream());
});

// HTML
gulp.task('html', ['html:minify']);

// Default task
gulp.task('default', ['html']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

//Dev task
gulp.task('dev', ['html', 'browserSync'], function() {
  gulp.watch(htmlFile, ['html']);
});