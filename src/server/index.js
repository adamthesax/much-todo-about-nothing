var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../public'));
app.use('/api', require('./api'));

app.listen(3000);
