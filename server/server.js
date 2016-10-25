var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var port = 3000;

app.use(express.static('../client'));
app.use(bodyParser.json());

mongoose.connect('mongodb://main:test123@ds063406.mlab.com:63406/moviereviewsdata');

require('./config/routes.js')(app, express);

app.listen(port);

console.log('Listening on port: ' + port);
