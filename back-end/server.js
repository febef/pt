

var
   cookieParser      = require('cookie-parser'       ),
   bodyParser        = require('body-parser'         ),
   express           = require('express'             ),
   session           = require('express-session'     ),
   MongoStore        = require('connect-mongo'       )(session),
   morgan            = require('morgan'              ),
   path              = require('path'                ),
   cfg, app;

module.exports = app = express();

require('./config');
cfg = app.get('cfg');

app.set('views', path.join(__dirname, '../front-end/views'));
app.set('view engine', cfg.viewEngine);
app.set('port', cfg.port);
app.use(morgan(cfg.morgan));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../resources')));
app.use(express.static(path.join(__dirname, cfg.scriptsPath)));

// livereload
if (app.get('env')=='development')
   app.use(require('connect-livereload')({port: 9002}));

// sesiones 'permanentes' en mongoDB
cfg.session.store = new MongoStore(cfg.mongoStore);

// sesiones
app.use(session(cfg.session));

// base de satos
require('./lib/mongodb');

// internacionalizacion
require('./lib/i18n');

// manejo de usuarios
require('./lib/pasport');

// rutas.
require('./lib/routes');

app.disable('x-powered-by');

// error handlers
//=============================================================================
// catch 404 and forward to error handler
app.use( function(req, res, next) {
   var err = new Error('');
   err.status = 404;
   next(err);
});

// production error handler
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('404', {
      msg: err.message,
      error: (app.get('env')=='development')? err : {}
   });

});

//Firing Up express
//=============================================================================
app.listen(app.get('port'), function(){
   console.log(("Express server listening on port " + app.get('port')));
});
