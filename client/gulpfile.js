const { AssertionError } = require('assert');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')


gulp.task('compileScss', () => {
    return gulp.src('src/components/**/*.scss')
        .pipe(concat('app.scss'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css'))
});

gulp.task('watchScss', () => {
    return gulp.watch('src/components/**/*.scss', (done) => {
        gulp.series(['compileScss'])(done)
    })
})
gulp.task('default', gulp.series(['compileScss', 'watchScss']))
