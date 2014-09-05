var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json())
app.use('/api', require('./api'));

var publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));
app.get('*', function(req,res) {
    res.sendFile(publicPath + "/index.html");
});

app.listen(3000);
