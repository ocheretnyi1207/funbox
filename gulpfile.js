const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const server = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("css", function () {
    return gulp.src("scss/style.scss")
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("css"))
      .pipe(server.stream())
  });

  gulp.task("server", function () {
    server.init({
      server: "",
      notify: false,
      open: true,
      cors: true,
      ui: false
    });
  });

  gulp.task("refresh", function (done) {
    server.reload();
    done();
  });

gulp.watch("scss/**/*.scss", gulp.series("css"));
gulp.watch("*.html", gulp.series("refresh"));
gulp.watch("*.html").on("change", server.reload);


gulp.task("start", gulp.series("css", "server"));
