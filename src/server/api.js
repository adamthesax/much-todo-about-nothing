var express = require('express'),
    _ = require("underscore"),
    uuid = require('node-uuid'),
    fs = require('fs'),
    path = require('path');

var jsonPath = path.resolve(__dirname, "../../data/lists.json");
var lists = [];
if (fs.existsSync(jsonPath)) {
    lists =  require(jsonPath);
}

function save() {
    fs.writeFile(jsonPath, JSON.stringify(lists, null, '\t'), function (err) {
        if (err) throw err;
        console.log('Data json successfully saved');
    });
}

var api = express.Router();

// gets all lists
api.get('/list', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(lists);
});

// creates a new list
api.post('/list', function (req, res) {

    // grab the list coming in from the request
    var list = req.body;
    // create a new id
    list.id = uuid.v4();
    // save it to memory
    lists.push(list);

    // flush what's in memory to disk
    save();

    res.setHeader('Content-Type', 'application/json');
    res.send(list);
});

// edits a list
api.put('/list/:id/', function (req, res) {
    // search for the list by id
    var list = _.findWhere(lists, {id: req.params.id});

    // if we can't find it throw a 404
    res.setHeader('Content-Type', 'application/json');
    if (_.isUndefined(list)) {
        res.status(404).send({"error": "cannot find list " + req.params.id});
        return;
    }

    // update the list in memory with the body
    _.extend(list, req.body);

    // flush the lists to disk
    save();

    // respond with the updated list
    res.send(list);
});

// get a specific list
api.get('/list/:id', function (req, res) {
    var list = _.findWhere(lists, {id: req.params.id});

    if (_.isUndefined(list)) {
        res.status(404).send({"error": "cannot find list " + req.params.id});
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(list);
});

api.delete('/list/:id', function (req, res) {
    var list = _.findWhere(lists, {id: req.params.id});

    if (_.isUndefined(list)) {
        res.status(404).send({"error": "cannot find list " + req.params.id});
        return;
    }

    lists = _.without(lists, list);
    save();

    res.setHeader('Content-Type', 'application/json');
    res.end();
});

module.exports = api;

