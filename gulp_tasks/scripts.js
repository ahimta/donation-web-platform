const gulp = require('gulp');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');

const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(conf.path.src('**/*.tsx'))
    .pipe(tslint())
    // .pipe(tslint.report({emitError: false}))
    .pipe(browserSync.stream());
}
