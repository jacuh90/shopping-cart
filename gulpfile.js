var gulp = require('gulp'),
    minifyJs = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

gulp.task('js', function(){
    gulp.src([
        'app/scripts/*.module.js',
        'app/scripts/*.js',
        'app/scripts/components/**/*.module.js',
        'app/scripts/components/**/*.js',
        'app/scripts/shop/**/*.module.js',
        'app/scripts/shop/**/*.js'])
        .pipe(plumber())
        .pipe(concat('app.js'))
        //.pipe(minifyJs())
        .pipe(gulp.dest('app/web/js'));
});

gulp.task('vendor-js', function(){
    gulp.src([
            'bower_components/angular/angular.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js'
        ])
        .pipe(plumber())
        .pipe(concat('vendor.min.js'))
        .pipe(minifyJs())
        //.on('error', console.error.bind(console))
        .pipe(gulp.dest('app/web/js'));
});


gulp.task('styles', function(){
    gulp.src('app/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('app/web/css'))
        .pipe(livereload());
});

gulp.task('vendor-styles', function(){
    gulp.src([
            'bower_components/normalize-css/normalize.css',
            'bower_components/angular-toastr/dist/angular-toastr.min.css'
        ])
        .pipe(concat('lib.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('app/web/css'))
        .pipe(livereload());
});


gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('app/scripts/**/*.js', ['js']);
    gulp.watch('app/styles/*.scss', ['styles']);
    gulp.watch('app/styles/partials/*.scss', ['styles']);
});

gulp.task('default', ['styles','vendor-styles','js', 'vendor-js', 'watch']);