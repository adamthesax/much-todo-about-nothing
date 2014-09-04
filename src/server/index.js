var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use('/api', require('./api'));

app.listen(3000);
