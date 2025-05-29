const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const clone = require("gulp-clone");
const merge = require("merge-stream");

const paths = {
  scss: {
    src: "scss/**/*.scss",
    dest1: "css",
    dest2: "../Palletteo/palletteo/src/app/styles",
  },
};

function compileScss() {
  const source = gulp
    .src(paths.scss.src)
    .pipe(sass().on("error", sass.logError));

  const stream1 = source.pipe(clone()).pipe(gulp.dest(paths.scss.dest1));
  const stream2 = source.pipe(clone()).pipe(gulp.dest(paths.scss.dest2));

  return merge(stream1, stream2);
}

function watchFiles() {
  gulp.watch(paths.scss.src, compileScss);
}

exports.default = gulp.series(compileScss, watchFiles);
exports.build = compileScss;
