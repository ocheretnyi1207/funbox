const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const server = require("browser-sync");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const htmlmin= require("gulp-htmlmin");

gulp.task("css", function () {
    return gulp.src("src/scss/style.scss")
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(csso())
      .pipe(rename("style.min.css"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("build/css"))
      .pipe(server.stream())
  });

  gulp.task("server", function () {
    server.init({
      server: "build/",
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

  gulp.task("html-minify", function () {
    return gulp.src("build/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build"))
  });

  gulp.task("copy", function () {
    return gulp.src([
      "src/fonts/**/*.{woff2,woff}",
      "src/*.html",
      "src/img/**",
      "src/js/**",
    ], {
      base: "src"
    })
    .pipe(gulp.dest("build"))
  });

gulp.watch("src/scss/**/*.scss", gulp.series("css"));
gulp.watch("src/*.html", gulp.series("refresh"));
gulp.watch("src/*.html").on("change", server.reload);

gulp.task("build", gulp.series("css", "copy", "html-minify"));
gulp.task("start", gulp.series("build", "server"));
