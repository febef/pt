

var
   cookieParser      = require('cookie-parser'       ),
   bodyParser        = require('body-parser'         ),
   express           = require('express'             ),
   session           = require('express-session'     ),
   MongoStore        = require('connect-mongo'       )(session),
   morgan            = require('morgan'              ),
   path              = require('path'                ),
   cfg, app;

module.exports = exports = app = express();

app.set('cfg', require(path.join(__dirname, './config/' +
            app.get('env') + '.json')));
cfg = app.get('cfg');

app.set('views', path.join(__dirname, '../front-end/views'));
app.set('view engine', 'jade');
app.set('port', cfg.port);app.use(morgan(cfg.morgan));
app.use(morgan(cfg.morgan));
app.use(bodyParser.json());
app.use(cookieParser());

if (app.get('env')=='development')
   app.use(require('connect-livereload')({port: 9002}));

app.use(express.static(path.join(__dirname, '../resources')));
app.use(express.static(path.join(__dirname, cfg.scriptPath)));

cfg.session.store = new MongoStore(cfg.mongoStore);
app.use(session(cfg.session));

require('./lib/mongodb');

require('./lib/i18n');

require('./lib/pasport');

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
