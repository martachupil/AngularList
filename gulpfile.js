var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var importer = require('postcss-import');
var cssnext = require('cssnext');
var precss = require('precss');


gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnext,
        importer,
        precss,
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));

});


gulp.task('watch', ['css'],function () {
    gulp.watch('./src/**/*', ['css']);
});