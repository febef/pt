
var
   app  = module.parent.exports,
   path = require('path'),
   i18n = require('i18n'),
   cfg  = app.get('cfg').i18n;

cfg.directory = path.join(__dirname, cfg.directory);
i18n.configure(cfg);

app.use(i18n.init);
app.use(function(req, res, next) {
   if(req.session.locale)
      req.setLocale(req.sessino.locale);
   next();
});

