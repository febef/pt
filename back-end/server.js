var
   connectLivereload = require('connect-livereload'),
   cookieParser      = require('cookie-parser'     ),
   bodyParser        = require('body-parser'       ),
   express           = require('express'           ),
   session           = require('express-session'   ),
   MongoStore        = require('connect-mongo'     )(session),
   morgan            = require('morgan'            ),
   path              = require('path'              ),
   cfg, app;

module.exports = exports = app = express();

app.set('cfg', require(path.join(__dirname, './config/' +
            app.get('env') + '.json')));
cfg = app.get('cfg');

app.set('views', path.join(__dirname, './views'));
app.set('view eninge', 'jade');
app.use(morgan(app.get('cfg').morgan));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../resources')));
app.use(express.static(path.join(__dirname, cfg.scriptPath,'./js')));
app.use(express.static(path.join(__dirname, cfg.scriptPath,'./css')));

cfg.session.store = new MongoStore(cfg.mongoStore);
app.use(session(cfg.session));



app.disable('x-powered-by');
app.use(connectLivereload());

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
      error: {}
   });

});

//Firing Up express
//=============================================================================

app.set('port', cfg.port);
app.listen(app.get('port'), function(){
   console.log(("Express server listening on port " + app.get('port')));
});
