
var
   app    = module.parent.exports,
   router = require('express').Router();

router.get('/', function(req, res){
   var data = {
      title: "PT example :)"
   };
   res.render('panels/home', data);
});

app.use('/', router);
