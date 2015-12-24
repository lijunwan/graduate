var gulp = require('gulp');
var uglify=require('gulp-uglify');
var gutil = require('gulp-util');
var rename=require('gulp-rename');
// var sass = require('gulp-sass');
var minifyCss=require('gulp-minify-css');
var concat = require('gulp-concat');
var del = require('del');
var argv = require('yargs').argv;

gulp.task("app:dev",function(){
    gulp.src("./dist/assets/app/js/*.js")
        .pipe(gulp.dest('./dist/assets/app/js'));
          gulp.src("./src/index.html")
        .pipe(gulp.dest('./dist'));
});
gulp.task("app:prod",function(){
    gulp.src("./dist/assets/app/js/*.js")
        .pipe(uglify().on('error', gutil.log))
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/assets/app/js'));
});
/*gulp.task("app:css",function(){
    gulp.src("./src/app/scss/*")
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest("./dist/assets/css/app"))
});*/


gulp.task("vendor:icons",function(){
    gulp.src("./src/vendor/icons/*")
        .pipe(gulp.dest("./dist/assets/vendor/icons"))
});

gulp.task("vendor:css",function(){
    gulp.src("./src/vendor/css/*")
        .pipe(minifyCss())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest("./dist/assets/vendor/css"))
});
gulp.task("vendor:fonts",function(){
    gulp.src("./src/vendor/fonts/*")
        .pipe(gulp.dest("./dist/assets/vendor/fonts"))
});
/*gulp.task("vendor:js",function(){
    gulp.src(["./src/vendor/js/*.js"])
        .pipe(concat('vendor.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/assets/vendor/js'));
});*/

gulp.task("vendor:css:prod",function(){
    gulp.src("./src/vendor/css/*")
        .pipe(minifyCss())
        .pipe(concat('vendor.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./dist/assets/vendor/css"))
});

/*gulp.task("vendor:js:prod",function(){
    gulp.src(["./src/vendor/js/*.js"])
        .pipe(concat('vendor.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/assets/vendor/js'));
});*/

gulp.task("vendor",function(){
    gulp.run("vendor:css");
    gulp.run("vendor:fonts");
    // gulp.run("vendor:js");
    gulp.run("vendor:icons");
});
gulp.task("vendor:prod",function(){
    gulp.run("vendor:css:prod");
    gulp.run("vendor:fonts");
    // gulp.run("vendor:js:prod");
    gulp.run("vendor:icons");
});

gulp.task("build",function(){
    switch(argv.env){
        case "dev":
            gulp.run("app:dev");
            gulp.run("vendor");
        case "prod":
            gulp.run("app:prod");
            gulp.run("vendor:prod");
    }
    // gulp.run("app:images");
    // gulp.run("vendor");
});

gulp.task("build:vendor",function(){
    gulp.run("vendor");
});

gulp.task('clean', function (cb) {
    del(['./dist/**/*'], cb);
});
