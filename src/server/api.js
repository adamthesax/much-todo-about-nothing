var express = require('express');
var api = express.Router();

api.get('/list', function (req, res) {
    res.end("here are all the lists");
});

api.post('/list', function (req, res) {
    res.end("You just created a new list");
});

api.put('/list/', function (req, res) {
    res.end("You just edited an existing list");
});

api.get('/list/:id', function (req, res) {
    res.end("here's your specified list");
});

api.put('/list/:id', function (req, res) {
    res.end("you just edited a specific list");
});

module.exports = api;

