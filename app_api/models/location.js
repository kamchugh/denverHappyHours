var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
  street : {type : String, "default" : "NOSTREET"},
  city : {type : String, "default" : "NOCITY"},
  state : {type : String, "default" : "NOSTATE"},
  zip : {type : String, min : 5, max : 9}
}, {_id : true});  // id

var dealSchema = new mongoose.Schema({
	dealType : {type : String, "default" : "USER WILL PUT FOOD OR DRINK HERE"},
	description :  {type : String, "default" : "NO DESCRIPTION GIVEN"},
	time : {type : String, "default" : "NO TIME GIVEN"},
	days : {type : String, "default" : "NO DAYS GIVEN"}
})

var locationSchema = new mongoose.Schema({
	deal : [dealSchema],
	neighborhood : {type : String, "default" : "NO NEIGHBORHOOD GIVEN"},
	owner : {type : String, "default" : "NO USENAME"},
	address : [addressSchema],
	name : {type : String, "default" : "NO NAME GIVEN"}
	
})

mongoose.model('HHLocation', locationSchema);