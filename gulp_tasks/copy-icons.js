const gulp = require('gulp');

const conf = require('../conf/gulp.conf');

gulp.task('copy-icons', function() {
  return gulp.src(conf.path.src('app/images/*'))
    .pipe(gulp.dest(conf.path.dist('images/')));
})
