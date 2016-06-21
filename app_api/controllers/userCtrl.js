var mongoose = require('mongoose');
var dbLocation = 'mongodb://localhost/happyHours'

var User = mongoose.model('User');

module.exports.users = function(req,res,next) {
  User.find(function(err, user){
    if (err) return next(err);
    res.json(user);
  });
};

module.exports.create = function(req,res,next){
	
	console.log(req.body);
  var user = new User({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    _id : req.body._id,
    password : req.body.password,
    email : req.body.email,
    phonenumber : req.body.phonenumber,
  });
  user.save(function(err, user){
    if (err) return next(err);
    res.status(201); // Created
    res.json(user); // send new person json
  });
};


// show an individual username
module.exports.showOne = function(req,res,next){
  User.findOne({_id : req.params.id},
    function(err, user) {
      if (err) return next(err);
      res.json(user);
    });
};

//update a user
module.exports.update = function(req,res,next){
  User.update({_id : req.params.id},
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

// destroy a user

module.exports.destroy = function(req,res,next){
  User.find({_id : req.params.id})
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