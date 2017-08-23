
const API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast';
const API_KEY = process.env.API_KEY;
const request = require('request');
const assert = require('assert');

assert.ok(API_KEY, 'process.env.API_KEY is missing - get yours from: https://openweathermap.org/api');

exports.query = (req, res) => {
    try {
        let query = req.params.query;
        let url = `${API_ENDPOINT}?id=${query}&type=accurate&units=metric&appid=${API_KEY}`;

        req.pipe(request(url)).pipe(res);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
