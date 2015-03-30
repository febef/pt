
var
   app    = module.parent.exports,
   router = require('express').Router();

router.get('/', function(req, res){
   var data = {
      title: "wendy planilla de ejemplo :)"
   };
   res.render('pages/home', data);
});


router.get('/panels/:panel', function(req, res){
   var data = {};
   res.render('panels/'+req.params.panel, data);
});


app.use('/', router);
