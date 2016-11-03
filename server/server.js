var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var port = 3000;
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

//Your DB connection here
<<<<<<< HEAD
mongoose.connect('mongodb://localhost/GOD');
=======
mongoose.connect('mongodb://localhost/zeus');
>>>>>>> d16a70e1bd50c42f3f25a4cce361818d5f377ce1

require('./config/routes.js')(app, express);

app.listen(port);

console.log('Listening on port: ' + port);
