
var
   app  = module.parent.exports,
   i18n = require('i18n');

i18n.configure(app.get('cfg').i18n);

app.use(i18n.init);
app.use(function(req, res, next) {
   if(req.session.locale)
      req.setLocale(req.sessino.locale);
   next();
});

