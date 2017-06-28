var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

//convert sass to css and inject using browser sync
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
});

//move js files to src inject using browser sync
gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
      .pipe(gulp.dest('src/js'))
      .pipe(browserSync.stream());
});

//launch static server and watch files
gulp.task('serve', ['sass'],   function() {

    browserSync.init({
      server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);