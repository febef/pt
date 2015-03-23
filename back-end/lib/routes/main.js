var router = require('express').Router();

router.get('/', function(req, res){
   var data = {
      title: "PT example :)"
   };
   res.render('panels/home', data);
});

module.exports = router;
