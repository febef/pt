
var
   app    = module.parent.exports,
   router = require('express').Router();

router.get('/', function(req, res){
   var data = {
      title: "wendy planilla de ejemplo :)"
   };
   res.render('panels/home', data);
});

app.use('/', router);
