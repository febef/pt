var router = require('express').Router();

router.get('/', function(req, res){
   res.render('panels/home');
});

module.exports = router;
