var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var port = 3000;
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

//Your DB connection here
mongoose.connect('mongodb://localhost/zeus');

require('./config/routes.js')(app, express);

app.listen(port);

console.log('Listening on port: ' + port);
