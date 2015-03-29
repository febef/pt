var
   app           = module.parent.exports,
   LocalStrategy = require('passport-local').Strategy,
   users         = app.get('db').users;

module.exports = new LocalStrategy(
{
   usernameField : 'email',
   passwordField : 'password'
},
   function(username, pass, done) {
      users
         .findOne({ where : { email : username, password : hpass } })
         .success(function(user) {
            if (!user) return done( null, false, {
                  message : 'Incorrect username or password.'
            });
            return done(null, user, {message : ""});
         });
   }
);
