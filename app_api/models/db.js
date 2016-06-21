var mongoose = require('mongoose');
var dbLocation = 'mongodb://localhost/happyHours'

mongoose.connect(dbLocation);
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose has disconnected from: ' + dbLocation);
});
// Error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection has failed due to error: ' + err);
});
// Connected
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to: ' + dbLocation);
});

process.once('SIGUSR2', function () {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected by nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
  });
});
// Application termination (ctrl + c)
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected by user signal interrupt');
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected by heroku signal termination');
    process.exit(0);
  });
});

require('./location');
require('./user');