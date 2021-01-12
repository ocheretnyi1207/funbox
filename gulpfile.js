const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const bs = require("browser-sync");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
const pug = require("gulp-pug");
const del = require("del");

gulp.task("html", () => {
  return gulp.src("src/index.pug")
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("build"))
})

gulp.task("css", () => {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(bs.stream())
})

gulp.task("js", () => {
  return gulp.src("src/js/main.js")
    .pipe(webpack({
      config: require("./webpack.config.js")
    }))
    .pipe(gulp.dest("build/js/"))
})

gulp.task("server", () => {
  bs.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/index.pug", gulp.series("html"));
  gulp.watch("src/scss/**/*.scss", gulp.series("css"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("src/**/*.{scss,pug,js}", gulp.series("refresh"));
  gulp.watch("src/**/*.{scss,pug,js}").on("change", bs.reload);
})


gulp.task("refresh", (done) => {
  bs.reload();
  done();
});

gulp.task("copy", () => {
  return gulp.src([
      "src/fonts/**/*.{woff2,woff}",
      "src/img/**",
    ], {
      base: "src"
    })
    .pipe(gulp.dest("build"))
});

gulp.task("del", () => {
  return del("build")
})

gulp.task("build", gulp.series("del", "html", "css", "js", "copy"));
gulp.task("start", gulp.series("build", "server"));
