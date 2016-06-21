var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstname : {type : String, "default" : "NO FIRST NAME"},
  lastname : {type : String, "default" : "NO LAST NAME"},
  _id : {type : String,
  	required : [
      true, 
      "username is required"
    ]},
  password : {type : String, "default" : "NO PASSWORD"},
  email : {type : String,
  required : [
      true, 
      "email Address is required"
    ]},
  phonenumber : {type : Number, "default" : "0000000"},
});

mongoose.model('User', userSchema);