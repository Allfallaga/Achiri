const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

// Compile tous les fichiers SCSS des composants en un seul CSS optimisé pour l'app
gulp.task('compileScss', () => {
  return gulp.src('../../src/components/**/*.scss', { allowEmpty: true })
    .pipe(concat('app.scss'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('../../src/assets/css'));
});

// Surveille les changements SCSS pour recompiler automatiquement
gulp.task('watchScss', () => {
  return gulp.watch('../../src/components/**/*.scss', gulp.series('compileScss'));
});

// Tâche par défaut : compile puis watch
gulp.task('default', gulp.series('compileScss', 'watchScss'));