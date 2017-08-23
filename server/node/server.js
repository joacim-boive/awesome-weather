'use strict';

const API_PORT = 3000;

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({path: './.env'}); // Read any environment vars from .env-file in the root

const typeahead = require('./src/typeahead');
const weather = require('./src/weather');

/** TODO
 * Add brotli support
 * const https = require('https'); //Required for Brotli
 * const shrinkRay = require('shrink-ray');
 * @type {*|createApplication}
 */
const express = require('express');
const cors = require('cors');
const apicache = require('apicache');

const app = express();
const cache = apicache.options({
    headers: {
        'cache-control': 'no-cache'
    }
}).middleware;

app.use(cors());

/*
// app.use(cache());

DON'T ENABLE THIS!
It will cause a stack overflow, as cache is specified in one of the routes already.
Remove the particular caching for that route in case of enabling global caching.
 */

// , cache('10 minutes'),
app.get('/api/weather/:query', cache('10 minutes'), weather.query);

app.get('/api/typeahead/:query', cache('10 minutes'), typeahead.query);


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

console.info('Huston! We have liftoff!');
