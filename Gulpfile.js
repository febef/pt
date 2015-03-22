

var
   gulp               = require('gulp'),
   stylus             = require('gulp-stylus'),
   nib                = require('nib'),
   gls                = require('gulp-live-server'),
   connect            = require('connect'),
   server, tinylr;


gulp.task('watches', function () {
   server = gls.new(['back-end/server.js']);
   gulp.watch(['front-end/src/js/*.js'], notifyLiveReload);
   gulp.watch(['front-end/src/css/*.stly'], ['css']);
   gulp.watch(['front-end/src/css/*.css'], notifyLiveReload);
   gulp.watch(['front-end/src/views/**/*.jade'], notifyLiveReload);
   gulp.watch(['resources/**/*'], notifyLiveReload);
   gulp.watch(['back-end/server.js', 'back-end/lib/**/*.js'], ['serverrestart']);
});

gulp.task('server', function(){
   server.stop();
   server.start();
});

gulp.task('livereload', function() {
   tinylr = require('tiny-lr')();
   tinylr.listen(9002);
});

function notifyLiveReload(event) {
   var fileName = require('path').relative(__dirname, event.path);
   tinylr.changed({
      body: {
         files: [fileName]
      }
   });
   console.log("[LiveReload] by>", fileName);
}

gulp.task('serverrestart', function(){
//   server.stop();
   server.start();
});
//Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
   gulp.src('./front-end/src/css/*.styl')
      .pipe(stylus({ use: nib() }))
      .pipe(gulp.dest('./front-end/css'));
});

gulp.task('default', ['livereload','watches','server']);
