'use strict';

const API_PORT = 3000;

const typeahead = require('./src/typeahead');
const weather = require('./src/weather');

const express = require('express');
// const https = require('https'); //Required for Brotli
// const shrinkRay = require('shrink-ray');
const cors = require('cors');
const apicache = require('apicache');

const app = express();
const cache = apicache.options({
    headers: {
        'cache-control': 'no-cache'
    }
}).middleware;

// app.use(shrinkRay());
app.use(cors());

/*
// app.use(cache());

DON'T ENABLE THIS!
It will cause a stack overflow, as cache is specified in one of the routes already.
Remove the particular caching for that route in case of enabling global caching.
 */

/** TODO
 * Only cache successful responses
 */
// app.get('/api/query/:query', cache('10 minutes'), (req, res) => {
app.get('/api/weather/:query', cache('10 minutes'), weather.query);

app.get('/api/typeahead/:query', cache('60 minutes'), typeahead.query);


// add route to display cache index
app.get('/api/cache/index', (req, res) => {
    res.json(apicache.getIndex());
});

// add route to manually clear target/group
app.get('/api/cache/clear/:target?', (req, res) => {
    res.json(apicache.clear(req.params.target));
});

// Catch all
app.all('*', (req, res) => {
    res.send({'error': 'Nothing to see here, move along...'});
});

app.listen(process.env.PORT || API_PORT);
// console.log(`Node is listening on address ${app.address()} and port ${app.address().port}`);
