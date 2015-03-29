var
   express         = require('express'),
   mongoose        = require('mongoose'),
   uniqueValidator = require('mongoose-unique-validator'),
   users;

users = new mongoose.Schema({

   name     : String,
   email    : {type: String, unique: true},
   password : String,

});

users.plugin(uniqueValidator);

module.exports = mongoose.model('admin', users);
