var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var imageMin = require('gulp-imagemin');
var htmlMin = require('gulp-htmlmin');
var notify = require('gulp-notify');

var imgFiles = [
  './public/assets/img/**/*.jpg',
  './public/assets/img/**/*.jpeg',
  './public/assets/img/**/*.gif',
  './public/assets/img/**/*.png',
  './public/assets/img/**/*.svg',
  '!./public/assets/img/originals/**/*'
];
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

// Minify Image
gulp.task('img', function() {
  return gulp.src(imgFiles)
    .pipe(imageMin())
    .pipe(gulp.dest('./public/dist/img/'));
});

// Default task
gulp.task('default', ['html', 'img']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

//Dev task
gulp.task('dev', ['html', 'img', 'browserSync'], function() {
  gulp.watch(imgFiles, ['img']);
  gulp.watch(htmlFile, ['html']);
});