const { src, dest, watch, series, parallel } = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const fontmin = require('gulp-fontmin');
const browserSync = require('browser-sync').create();

function copyHtml() {
        return src('src/*.html')
                .pipe(dest('public'));
}

function imageMin() {
        return src('src/img/**/*')
                .pipe(imagemin())
                .pipe(dest('public/img'));
}

function fontminTask() {
        return src('src/fonts/**')
                .pipe(fontmin())
                .pipe(dest('public/fonts'));
}

function scripts() {
        return src('src/js/**/*.js')
                .pipe(concat('main.js'))
                .pipe(uglify().on('error', function (e) {
                        console.log(e.toString());
                        this.emit('end');
                }))
                .pipe(dest('public/js'));
}

function sassTask() {
        return src('src/sass/main.scss')
                .pipe(sass({
                        outputStyle: 'compressed'
                }).on('error', sass.logError))
                .pipe(dest('public/css'))
                .pipe(browserSync.stream());
}

function reload(done) {
        browserSync.reload();
        done();
}

function serve(done) {
        browserSync.init({
                server: {
                        baseDir: 'public/'
                }
        });
        done();
}

function watchFiles() {
        watch('src/sass/**/*.scss', sassTask);
        watch('src/js/**/*.js', series(scripts, reload));
        watch('src/*.html', series(copyHtml, reload));
        watch('src/img/**/*', series(imageMin, reload));
        watch('src/fonts/**', series(fontminTask, reload));
}

const build = parallel(copyHtml, imageMin, scripts, fontminTask, sassTask);

const dev = series(build, serve, watchFiles);

exports.copyHtml = copyHtml;
exports.imageMin = imageMin;
exports.fontmin = fontminTask;
exports.scripts = scripts;
exports.sass = sassTask;
exports.build = build;
exports.dev = dev;
exports.default = dev;
