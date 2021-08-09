var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));
var browsersync = require('browser-sync').create();
var del = require('del');

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        notify: true
    });
    done();
}

function css() {
    return gulp.src("./main.scss")
        .pipe(
            scss({
                outputStyle: 'compressed'
            }).on('error', scss.logError)
        )
        .pipe(gulp.dest("./dist"))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch(["./*.scss"], css);
    gulp.watch(["./*.html"], (done) => { gulp.src("./*.html").pipe(browsersync.stream()); done(); });
}

function clean() {
    return del("./dist");
}

let build = gulp.series(clean, css);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.build = build;
exports.watch = watch;
exports.default = watch;