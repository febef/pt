var route = require('express').Route;

route.get('/', function(res, req){
   res.send('hola mundo! :p');
});
