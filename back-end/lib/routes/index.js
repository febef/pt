
var
   fs   = require('fs'),
   path = require('path');

module.exports = module.parent.exports;

fs
   .readdirSync(__dirname)
   .filter(function(file) {
      return (
         ( file.indexOf('.') !== 0          ) &&
         ( file.slice(-3)     == '.js'      ) &&
         ( file              !== 'index.js' )
      );
   })
   .forEach(function(file) {
      require(path.join(__dirname, file));
   });


