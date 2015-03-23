// Gulpfile por febef, fb@sinaptica.io
// Modulos y variables =========================================================
var
   path               = require('path'),
   gulp               = require('gulp'),
   stylus             = require('gulp-stylus'),
   nib                = require('nib'),
   gls                = require('gulp-live-server'),
   connect            = require('connect'),
   mocha              = require('gulp-mocha'),
   gulpMultinject     = require('gulp-multinject'),
   wiredep            = require('wiredep'),
   sglob              = require("glob").sync,
   server, tinylr;

// Tareas gulp =================================================================

// Detecta cambios en los archivos.
gulp.task('watches', function () {
   server = gls.new(['back-end/server.js']);
   gulp.watch(['front-end/src/js/*.js'], notifyLiveReload);
   gulp.watch(['front-end/src/js/*.js'], [ 'inject']);
   gulp.watch(['front-end/src/css/*.styl'], ['css']);
   gulp.watch(['front-end/src/css/*.css'], notifyLiveReload);
   gulp.watch(['front-end/src/css/*.css'],[ 'inject']);
   gulp.watch(['front-end/views/**/*.jade'], notifyLiveReload);
   gulp.watch(['resources/**/*'], notifyLiveReload);
   gulp.watch(['back-end/server.js', 'back-end/lib/**/*.js'], ['RunServer']);
});

// Incluye los archivos css/js.
gulp.task('inject', function() {

   var
      w = wiredep({directory: "./front-end/src/libs"}),
      csss = [].concat(w.css.concat(sglob('./front-end/src/css/**/*.css'))),
      jss  = [].concat(w.js.concat(sglob('./front-end/src/js/**/*.js')));

   gulp.src(['./front-end/views/layout.jade'])
      .pipe(gulpMultinject(jss,'js', { base:"./front-end/src"}))
      .pipe(gulpMultinject(csss, 'css',{ base:"./front-end/src"}))
      .pipe(gulp.dest('./front-end/views'));
});

// Inicia el livereload.
gulp.task('livereload', function() {
   tinylr = require('tiny-lr')();
   tinylr.listen(9002);
});

// Funcion que dispara el livereload.
function notifyLiveReload(event) {
   var fileName = path.relative(__dirname, event.path);
   console.log("[LiveReload!!!]");
   tinylr.changed({body: {files: [fileName]}});
}

// Corre el servidor en modo produccion.
gulp.task('RunServer', function(){
   process.env='production';
   server.stop();
   server.start();
});

// Corre el servidor en modo desarrollo.
gulp.task('RunServerDev', function(){
   server.stop();
   server.start();
   notifyLiveReload({path: './front-end/views/layout.jade'});
});

// Compila de Stylus a CSS.
gulp.task('css', function() {
   gulp.src('./front-end/src/css/*.styl')
      .pipe(stylus({ use: nib() }))
      .pipe(gulp.dest('./front-end/src/css'));
});

// Ejecuta los test mocha.
gulp.task('mocha', function(){
   gulp.src('./test/test.js')
      .pipe(mocha());
});

// Comprime, minifica y unifica todo.
gulp.task('compress', function(){

});

// Limpia 'dist'
gulp.task('clear', function(){

});

// Lanza un explorador web, con la pagina.
gulp.task('show', function(){

});

// Realiza las pruebas en el modo produccion.
gulp.task('test', ['clear', 'prod', 'mocha']);
// Comando para iniciar en modo produccion.
gulp.task('start', ['prod', 'RunServer']);
// Comando que prepara el el modo produccion.
gulp.task('prod', ['clear', 'inject', 'compress']);
// Comando para lanzar el entorno de desarrollo.
gulp.task('dev', ['inject', 'livereload','watches', 'RunServerDev']);
// Simil anterior, pero tambien abre la web en un exporador.
gulp.task('devs', ['dev', 'show']);
// Establesco 'dev' como tarea por defecto de gulp.
gulp.task('default', ['dev']);
