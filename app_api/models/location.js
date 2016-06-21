var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
  street : {type : String, "default" : "NOSTREET"},
  city : {type : String, "default" : "NOCITY"},
  state : {type : String, "default" : "NOSTATE"},
  zip : {type : String, minlength : 5, maxlength : 9}
}, {_id : true});  // id

var dealSchema = new mongoose.Schema({
	dealType : {type : String, "default" : "USER WILL PUT FOOD OR DRINK HERE"},
	description :  {type : String, "default" : "NO DESCRIPTION GIVEN"},
	time :  {type : String, "default" : "NO TIME GIVEN"},
	days : {type : String, "default" : "NO DAYS GIVEN"}
})

var locationSchema = new mongoose.Schema({
	name : {type : String, "default" : "NO NAME GIVEN"},
	address : {type : addressSchema, "default" : "NOADDRESS"},
	deal : [dealSchema],
	neighborhood : {type : String, "default" : "NO NEIGHBORHOOD GIVEN"},
	owner : {type : String, "default" : "NO USENAME"}
})

mongoose.model('HHLocation', locationSchema);