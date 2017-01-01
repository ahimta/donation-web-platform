const gulp = require('gulp');

const conf = require('../conf/gulp.conf');

gulp.task('copy-manifest', function() {
  return gulp.src(conf.path.src('manifest.json'))
    .pipe(gulp.dest(conf.paths.dist));
})
