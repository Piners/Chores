const gulp = require('gulp');
const gutil = require('gulp-util');
const bower = require('bower');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sh = require('shelljs');
const plumber = require ('gulp-plumber');
const path =require ('path');
const watch = require('gulp-watch');
const babel = require ('gulp-babel');
const sourcemaps =require ('gulp-sourcemaps');

//Declare File Paths ============================================

const paths = {
  jsSource: ['./www/js/**/*.js'],
  sassSource: ['./scss/**/*.scss']
};

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  paths: [ path.join(__dirname, 'styles') ]
};

// Define Tasks ====================================================

gulp.task('default', ['sass']);

gulp.task('js', () => {
  return gulp.src(paths.jsSource)
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(babel({
     presets: ["es2015"],
     compact: 'false',
  })) //comment out if not using ES6
  .pipe(concat('bundle.js'))
  //.pipe(uglify()) //Uncomment when code is production ready
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./www/public'))

});




gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/public/'))
    .on('end', done);
});

// gulp.task('watch', function() {
//   gulp.watch(paths.sass, ['sass']);
// });

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


// WATCH TASKS
// ============================================================

gulp.task('watch', () => {
  gulp.watch(paths.jsSource, ['js']);
  // gulp.watch(paths.serverSource, ['server']);
   gulp.watch(paths.sassSource, ['sass']);
});
// RUN DEFAULT TASK - first thing to run when gulp is called
// ============================================================
gulp.task('default', ['watch', 'js', 'sass']);
