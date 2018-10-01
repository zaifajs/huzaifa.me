var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    fontmin = require('gulp-fontmin');

// Copy all HTML files
gulp.task('copyHtml', () =>
    gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
);

// Optimize images
gulp.task('imageMin', () =>
	gulp.src('src/img/**')
		.pipe(imagemin())
		.pipe(gulp.dest('public/img'))
);

// Optimize fonts
gulp.task('fontmin', () =>
	gulp.src('src/fonts/**')
		.pipe(fontmin())
		.pipe(gulp.dest('public/fonts'))
);

// Scripts (uglify + concat)
gulp.task('scripts', () =>
	gulp.src('src/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(uglify().on('error', function(e){console.log(e);}))
		.pipe(gulp.dest('public/js'))
);

// Compile Sass
gulp.task('sass', () =>
	gulp.src('src/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
);

gulp.task('default', ['copyHtml', 'imageMin', 'scripts', 'sass', 'fontmin']);


gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/images/*', ['imageMin']);
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/*.html', ['copyHtml']);
  });