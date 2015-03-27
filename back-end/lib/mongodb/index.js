
var
   app      = module.parent.exports,
   fs       = require('fs'),
   path     = require('path'),
   lodash   = require('lodash'),
   mongoose = require('mongoose');

var ConnectionStr =  function(c) {
   var connStr = 'mongodb://';
   if (c.user !== "" && c.d !== "")
      connStr += c.user + ":" + c.password + "@";
   return connStr + c.url + "/" + c.name;
};

var Connect = function(str) {
   return mongoose.connect(str, function(err) {
      if (err) {
         console.log("Error al conectar con MongoDB.");
         console.log(err);
         return err;
      } else
         console.log("Conexión a MongoDB establecida.");
   });
};

var init = function(conf) {

   var db = {};

   fs
      .readdirSync(__dirname)
      .filter(function(file) {
         return (
            ( file.indexOf(".") !== 0          ) &&
            ( file.slice(-3)     == ".js"      ) &&
            ( file              !== "index.js" )
         );
      })
      .forEach(function(file) {
         db[file.slice(0, -3)] = require(path.join(__dirname, file));
      });

   lodash.extend({
      mongoose   : mongoose,
      Connection : Connect(ConnectionStr(conf))
   }, db);
   return db;
};

app.db = init(app.get('cfg').db);
