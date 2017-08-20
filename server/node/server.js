'use strict';


const config = require('./config.json');

const API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast';
const API_KEY = config.key;
const API_PORT = 3000;


const express = require('express');
const request = require('request');
const cors = require('cors');
const apicache = require('apicache');
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
const cache = apicache.options({
    headers: {
        'cache-control': 'no-cache',
        'debug': true
    }
}).middleware;

app.use(cors());

/*
// app.use(cache());

DON'T ENABLE THIS!
It will cause a stack overflow, as cache is specified in one of the routes already.
Remove the particular caching for that route in case of enabling global caching.
 */


let url = 'mongodb://localhost:27017';
// Use connect method to connect to the Server
mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected correctly to server');

    db.close();
});

/** TODO
 * Only cache successful responses
 */
app.get('/api/query/:query', cache('10 minutes'), (req, res) => {
    // Cache requests for 10 minutes: https://openweathermap.org/appid

    let query = req.params.query;
    let url = `${API_ENDPOINT}?q=${query}&appid=${API_KEY}`;

    req.pipe(request(url)).pipe(res);
});

// add route to display cache index
app.get('/api/cache/index', (req, res) => {
    res.json(apicache.getIndex());
});

// add route to manually clear target/group
app.get('/api/cache/clear/:target?', (req, res) => {
    res.json(apicache.clear(req.params.target));
});

app.all('*', (req, res) => {
    res.send({'error': 'Nothing to see here, move along...'});
});

app.listen(process.env.PORT || API_PORT);
