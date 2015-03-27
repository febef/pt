

var
   app        = module.parent.exports,
   fs         = require('fs'),
   path       = require('path'),
   cfg        = {},
   configPath = path.join(__dirname, './' + app.get('env'));

fs
   .readdirSync(configPath)
   .filter(function(file) {
      return (
         ( file.indexOf('.') !== 0          ) &&
         ( file.slice(-5)     == '.json'    )
      );
   })
   .forEach(function(file) {
      cfg[file.slice(0, -5)] = require(path.join(configPath, file));
   });

for (var p in cfg.server)
   cfg[p] = cfg.server[p];

delete cfg.server;
app.set('cfg', cfg);
