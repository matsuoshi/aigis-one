const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const $ = require('gulp-load-plugins')();


gulp.task('styles', () => {
  gulp.src(`src/styles/**/*.scss`)
    .pipe($.plumber())
    .pipe($.sass({
      outputStyle: 'compressed'
    }))
    .pipe($.autoprefixer())
    .pipe(gulp.dest('theme/aigis_assets/css'));
});


gulp.task('aigis', function() {
  del('./example').then(() => {
    gulp.src('aigis_config.yml')
      .pipe($.aigis());
  });
});


gulp.task('build', ['styles', 'aigis']);


gulp.task('watch', () => {
  gulp.watch(`src/**/*.scss`, ['styles', 'aigis']);
  gulp.watch(`theme/**/*.jade`, ['aigis']);
});


gulp.task('serve', ['watch'], () => {
  browserSync({
    server: {
      baseDir: 'example/',
    },
    files: [
      'example/**/*.(html|css)'
    ]
  });
});


gulp.task('default', ['build', 'serve']);
