/* eslint-disable switch-colon-spacing */
'use strict';

const express = require('express');
const request = require('request');
const cors = require('cors');
const apicache = require('apicache');

const config = require('./config.json');

const API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast';
const API_KEY = config.key;
const API_PORT = 3000;

const app = express();
const cache = apicache.options({
    headers: {
        'cache-control': 'no-cache',
        'debug': true
    }
}).middleware;

app.use(cors());
app.use(cache());

/** TODO
 * Only cache successful responses
 */
app.get('/api/query/:query', cache('10 minutes'), (req, res) => { // Cache requests for 10 minutes: https://openweathermap.org/appid
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
    res.send({'error': 'Nothing to see here, please move on...'});
});

app.listen(process.env.PORT || API_PORT);
