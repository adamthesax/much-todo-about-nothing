var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    morgan = require("morgan");

var app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/api', require('./api'));

var publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));
app.get('*', function(req,res) {
    res.sendFile(publicPath + "/index.html");
});

console.log("http://localhost:3000");
app.listen(3000);
