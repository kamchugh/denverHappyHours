var mongoose = require('mongoose');
var dbLocation = 'mongodb://localhost/happyHours'

var HHLocation = mongoose.model('HHLocation');

module.exports.locations = function(req,res,next) {
  HHLocation.find(function(err,HHlocation){
    if (err) return next(err);
    res.json(HHlocation);
  });
};

module.exports.create = function(req,res,next){
	
	console.log(req.body);
  var loc = new HHLocation({
    name : req.body.name,
    address : req.body.address,
    deal : req.body.deal,
    neighborhood : req.body.neighborhood,
    owner : req.body.owner,
  });
  loc.save(function(err,HHLocation){
    if (err) return next(err);
    res.status(201); // Created
    res.json(HHLocation); // send new person json
  });
};

module.exports.showByUsername = function(req,res,next) {
  HHLocation.find({owner : req.params.username} , function(err,HHlocation){
    if (err) return next(err);
    res.json(HHlocation);
  });
};


// show an individual location
module.exports.showOne = function(req,res,next){
  HHLocation.findOne({_id : req.params.id},
    function(err, HHLocation) {
      if (err) return next(err);
      res.json(HHLocation);
    });
};

//update a location
module.exports.update = function(req,res,next){
  HHLocation.update({_id : req.params.id},
  req.body, // update with the body of the request
  function(err, result){
    if (err) return next(err);
    res.status(202); // Accepted
    res.json(result); // Send result object
    // {
    //   "ok": 1,
    //   "nModified": 1,
    //   "n": 1
    // }
  });
};

// destroy a location 

module.exports.destroy = function(req,res,next){
  HHLocation.find({_id : req.params.id})
    .remove(function(err, result){
      console.error(err);
      if (err) return next(err);
      res.status(202); // Accepted
      res.json(result); // Send result object
      // {
      //   "ok": 1,
      //   "n": 1
      // }
    })
};

// show locations by neighborhood 

module.exports.showByNeighborhood = function(req,res,next) {
  HHLocation.find({neighborhood : req.params.neighborhood} , function(err,HHlocation){
    if (err) return next(err);
    res.json(HHlocation);
  });
};

// show by deal type

module.exports.showByDeal = function(req,res,next) {
  var match = req.params.deal
  HHLocation.find({deal : {$elemMatch : {dealType : match}}} , function(err,HHlocation){
    if (err) return next(err);
    res.json(HHlocation);
  });
};

//show by deal time

module.exports.showByDealTime = function(req,res,next) {
  var match = req.params.time
var tokens = match.split("-");
console.log(tokens[0])
console.log(tokens[1])
  console.log(match)
  HHLocation.find({deal : {$elemMatch : {time : { $gte: tokens[0], $lt: tokens[1] }}}} , function(err,HHlocation){
    if (err) return next(err);
    res.json(HHlocation);
  });
};

// show by day of week deal is offered - doesn't work yet 

module.exports.showByDay = function(req,res,next) {
  var match = req.params.day
  HHLocation.find({deal : {$elemMatch : {"days" : {$regex : ".*" + req.params.day + ".*"}}}} , function(err,HHlocation){
    if (err) return next(err);
    res.json(HHlocation);
  });
};

// show by name of restaurant 

module.exports.showByName = function(req,res,next) {
  HHLocation.find({name : req.params.name} , function(err,HHlocation){
    if (err) return next(err);
    res.json(HHlocation);
  });
};

// add a deal to a restaurant or bar by name

module.exports.addDeal = function(req,res,next){
  console.log("In add deal function");
  var deal = [];
  deal.push("At " + req.params.name);
  deal.push(" for " + req.body.dealType + ". ");
  deal.push(req.body.description + " between ");
  deal.push(req.body.time + " on ");
  deal.push(req.body.days + ". ");

       HHLocation.update(
        {name : req.params.name},
      {
        $push : {deal : {dealType : req.body.dealType, description : req.body.description, time : req.body.time, days : req.body.days}}
      }
      , function(err, result) {
        if (err) return next(err);
        res.json(deal);
      })
     
    
};