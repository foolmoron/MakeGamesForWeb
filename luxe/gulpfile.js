var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  exec = require('child_process').exec,
  gh = require('gh-pages'),
  path = require('path');

gulp.task('haxe:build', function(done){
  exec('haxelib run flow build web', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task('haxe:watch', ['haxe:build'], function(done){
  browserSync.reload();
  done();
})

gulp.task('watch',  function(done){
  browserSync.init({
    server: {
      baseDir: './bin/web'
    }
  });

  gulp.watch(['gulpfile.js'], ['haxe:watch']);
});

gulp.task('default', ['haxe:build', 'watch']);

gulp.task('deploy', ['haxe:build'], function (done) {
  gh.publish(path.join(__dirname, 'bin/web'));
});
