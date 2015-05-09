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
   minifyCss          = require('gulp-minify-css'),
   uglify             = require('gulp-uglify'),
   jade               = require('gulp-jade'),
   uncss              = require('gulp-uncss'),
   gulpMultinject     = require('gulp-multinject'),
   concat             = require('gulp-concat'),
   wiredep            = require('wiredep'),
   sglob              = require("glob").sync,
   clean              = require('gulp-clean'),
   server, tinylr;

// Tareas gulp =================================================================

// Detecta cambios en los archivos.
gulp.task('watches', function () {
   server = gls.new(['back-end/server.js']);
   gulp.watch(['front-end/src/js/*.js'], notifyLiveReload);
   gulp.watch(['front-end/src/css/*.styl'], ['css']);
   gulp.watch(['front-end/src/css/*.css'], notifyLiveReload);
   gulp.watch(['bower.json'],[ 'inject']);
   gulp.watch(['front-end/src/**/*'],[ 'inject']);
   gulp.watch(['front-end/views/**/*.jade'], notifyLiveReload);
   gulp.watch(['resources/**/*'], notifyLiveReload);
   gulp.watch([
      'back-end/**/*.js',
      'back-end/config/**/*.json'
   ], ['RunServerDev']);
});

// Incluye los archivos css/js.
gulp.task('inject', function() {

   var
      w = wiredep({directory: "./front-end/src/libs"}),
      csss = [].concat((w.css?w.css:[]).concat(sglob('./front-end/src/css/**/*.css'))),
      jss  = [].concat((w.js?w.js:[]).concat(sglob('./front-end/src/js/**/*.js')));

   gulp.src(['./front-end/views/**/*.jade'])
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
      .pipe(stylus({ use: [ nib()] }))
      .pipe(gulp.dest('./front-end/src/css'));
});

// Ejecuta los test mocha.
gulp.task('mocha', function(){
   gulp.src('./test/test.js')
      .pipe(mocha());
});

// Comprime, minifica y unifica todo.
gulp.task('compress', function(){

   var
      w     = wiredep({directory: "./front-end/src/libs"}),
      csss  = [].concat(w.css.concat(sglob('./front-end/src/css/**/*.css'))),
      jss   = [].concat(w.js.concat(sglob('./front-end/src/js/**/*.js')));

   gulp.src("./front-end/views/**/*.jade")
      .pipe(jade({data : {
         __: function(){return '';}
      }}))
      .pipe(gulp.dest("./front-end/.html"));

   var htmls = sglob('./front-end/.html/**/*.html');
console.log("HTMLS!:> ",htmls);
   gulp.src(csss)
      .pipe(minifyCss())
      .pipe(concat('main.min.css'))
      .pipe(uncss({ html: htmls}))
      .pipe(gulp.dest('./front-end/dist/css/'));

   gulp.src(jss)
      .pipe(uglify({mangle: false }))
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('./front-end/dist/js/'));

});

// Limpia 'dist'.
gulp.task('clean', function(){
   gulp.src('./front-end/dist/*', {read:false})
      .pipe(clean());
});

// Lanza un explorador web, con la pagina.
gulp.task('show', function(){

});

// Realiza las pruebas en el modo produccion.
gulp.task('test', ['clear', 'prod', 'mocha']);
// Comando para iniciar en modo produccion.
gulp.task('start', ['prod', 'RunServer']);
// Comando que prepara el el modo produccion.
gulp.task('prod', [/*'clear',*/ 'inject', 'compress']);
// Comando para lanzar el entorno de desarrollo.
gulp.task('dev', ['inject', 'livereload','watches', 'RunServerDev']);
// Simil anterior, pero tambien abre la web en un exporador.
gulp.task('devs', ['dev', 'show']);
// Establesco 'dev' como tarea por defecto de gulp.
gulp.task('default', ['dev']);
