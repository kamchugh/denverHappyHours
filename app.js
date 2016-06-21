var express = require('express');
var app = express();


require('./app_api/models/db');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 

var handlebars = require('express-handlebars')
.create({
    defaultLayout: '../../app_server/views/layouts/main',
    partialsDir: './app_server/views/partials/'
});
var path = require('path');
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use('/', require('./app_server/routes/baseRoutes'));

app.use('/locations', require('./app_api/routes/locationRoutes'));

app.use('/users', require('./app_api/routes/userRoutes'));

app.listen(3000, function() {
	 console.log('Hello World app started on http://localhost:' +  
      3000 + '; press ctrl-c to terminate.');
});