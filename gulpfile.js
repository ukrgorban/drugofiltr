var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var fontmin = require('gulp-fontmin');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');
var babel = require("gulp-babel");

gulp.task("babel", function () {
  return gulp.src("dev/babel/main.js")
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest("dev/js/"));
});
 
gulp.task('ftp', function () {
    return gulp.src('public/**/*')
        .pipe(ftp({
            host: 'wwweblab.ftp.ukraine.com.ua',
            user: 'wwweblab_drugofiltr',
            pass: 'drugofiltr'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed 
        // this can be a gulp plugin, gulp.dest, or any kind of stream 
        // here we use a passthrough stream 
        .pipe(gutil.noop());
});

 
//fonts
gulp.task('fonts', function () {
    return gulp.src('dev/fonts/**/*.ttf')
        .pipe(gulp.dest('public/fonts'));
});

//optimization img
gulp.task('image', () =>
    gulp.src('dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
);

//default
gulp.task('default', ['webserver', 'watch']);

//webserver
gulp.task('webserver', function() {
  gulp.src('dev/')
    .pipe(server({
      livereload: true,
      port: 7000,
      open: true
    }));
});

//webserver-public
gulp.task('public', function() {
  gulp.src('public/')
    .pipe(server({
      livereload: true,
      port: 5000,
      open: true
    }));
});

//sass
gulp.task('sass', function () {
return gulp.src('dev/sass/**/*.scss')
    //autoprefixer
    .pipe(autoprefixer({browsers: ['last 15 versions']}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dev/css'));
});

//watch
gulp.task('watch', function(){
  gulp.watch('dev/sass/**/*.scss', ['sass']); 
  gulp.watch('dev/babel/**/*.js', ['babel']); 
});

//build
gulp.task('build', function () {
    return gulp.src('dev/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('public'));
});
