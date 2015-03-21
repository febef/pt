

var
   gulp               = require('gulp'),
   stylus             = require('gulp-stylus'),
   nib                = require('nib'),
   server             = require('gulp-express');


gulp.task('watches', function () {
   gulp.watch(['frot-end/src/js/*'], server.notify);
   gulp.watch(['front-end/src/css/*'], ['css']);
   gulp.watch(['frot-end/views/*.jade']);
   gulp.watch(['resouces/**/*'], server.notify);
   gulp.watch(['back-end/server.js', 'back-end/lib/**/*.js'], ['serverrestart']);
});

gulp.task('server', function(){
  server.run(['./back-end/server.js']);
});

gulp.task('serverrestart', function(){
   server.stop();
   server.run();
   server.notify();
});
//Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
   gulp.src('./front-end/src/css/*.styl')
      .pipe(stylus({ use: nib() }))
      .pipe(gulp.dest('./front-end/src/src/css'))
      .pipe(server.notify());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('jade', function(event) {
   gulp.src('./front-end/src/views/**/*.jade')
      .pipe(server.notify());
});



gulp.task('default', ['watches','server']);


