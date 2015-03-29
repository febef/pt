var
   app           = module.exports = module.parent.exports;
   fs            = require('fs');
   path          = require('path');
   passport      = require('passport');

passport.serializeUser(function(user,  done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (
      ( file.indexOf('.') !==  0          ) &&
      ( file.slice(-3)     ==  '.js'      ) &&
      ( file              !==  'index.js' )
    );
  })
  .forEach(function(file) {
    passport.use(file.split('.')[0], require(path.join(__dirname, file)) ); 
  });

app.set('auth', passport);
app.use(passport.initialize());
app.use(passport.session());
