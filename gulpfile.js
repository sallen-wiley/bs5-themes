var theme = "jas";

const gulp = require("gulp");
const cleanCSS = require('clean-css');
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// gulp.task('sass', ()  => {
//     return gulp.src("app/scss/*.scss")
//         .pipe(sass())
//         .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.stream());
// });

gulp.task('sass' + theme, ()  => {
    return gulp.src("app/scss/" + theme + "/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(gulp.dest("app/scss/" + theme + "/"))
        .pipe(browserSync.stream());
});

gulp.task('start', gulp.series(['sass' + theme], function() {

    browserSync.init({
      server: "./app/",
      index: "./index.html",
    });

    gulp.watch("app/scss/**/*.scss", gulp.series(['sass' + theme]));
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('start'));
