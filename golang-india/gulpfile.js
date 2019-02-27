// Port#
const PORT = '8080';

const scssPathSource = 'mix/golang-india/_src/scss/*.scss';
const scssPathDestination = 'mix/golang-india/_assets/css';
const jsPathSource = 'mix/golang-india/_src/js/*.js';
const jsPathDestination = 'mix/golang-india/_assets/js';

// Imports
var gulp = require('gulp'),
  exec = require('child_process').exec,
  watch = require('gulp-watch'),
  minify = require('gulp-minify'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps');

// Start localhost
gulp.task('startWebServer', (cb) => {
  var root = process.cwd();
  exec('c:\\xampp\\php\\php.exe -S localhost:' + PORT + ' -t ' + root, (err, stdout, stderr) => {
    if (err) {
      return cb(err);
    }
  });
  console.log('==================================');
  console.log('GOLANG INDIA - The web server has started. PORT: ' + PORT);
  console.log('==================================');
  cb();
});

// Stop localhost
gulp.task('stopWebServer', (cb) => {
  exec('FOR /F "tokens=5 delims= " %P IN (\'netstat -ano ^| findstr :' + PORT + ' ^| findstr /i LISTENING\') DO TaskKill.exe /F /PID %P', (err, stdout, stderr) => {
    if (err) {
      return cb(err);
    }
  });
  console.log('==================================');
  console.log('The web server has stopped.');
  console.log('==================================');
  cb();
});

// Watchers
gulp.task('watch', (cb) => {
  livereload.listen();

  /* Watching HTML | CSS | JS files for any changes */
  /*******************************************************/

  watch('./**/*.html', (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      .pipe(livereload());
  });

  watch('./**/*.css', (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      .pipe(livereload());
  });

  watch('./**/*.js', (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      .pipe(livereload());
  });

  console.log('==================================');
  console.log('Watching your HTML | CSS | JS files.');
  console.log('==================================');


  /* Minifying JS | SCSS files */
  /*************************************/

  watch(jsPathSource, (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(minify({
        ext: {
          min: '.min.js'
        },
        noSource: true
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(jsPathDestination))
  });

  watch(scssPathSource, (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(scssPathDestination))
  });

  console.log('==================================');
  console.log('Minifing a JS | SCSS files.');
  console.log('==================================');

  cb();
});

// Say hello
gulp.task('sayHello', function () {
  console.log('==================================');
  console.log("Hi, I'm always with you!");
  console.log('==================================');
});

// run -> gulp (for default tasks)
gulp.task('default', ['startWebServer', 'watch']);
