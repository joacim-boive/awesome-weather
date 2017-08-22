/*
MONGO_URL assumes you're using the Docker setup, otherwise you need to provide
something like: 'mongodb://localhost:27017
when starting node
 */

const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo-server/cities_db';
const MAX_RESULTS = 10; // Max number of hits to return.

const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        _id: 'ObjectId',
        id: 'Number',
        country: 'String',
        name: {
            type: 'String',
            index: true
        },
        coord: {
            lat: 'Number',
            lon: 'Number'
        }
    }, {
        collection: 'cities_collection'
    });

const City = mongoose.model('City', schema);

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL, {
    useMongoClient: true
});


exports.query = (req, res) => {
    try {
        let query = req.params.query;
        let queryName = new RegExp('\^' + query+ '.*', 'i');

        City.find({'name': queryName}, {id: 1, name: 1, country: 1, _id: 0}, (err, docs) => {
            const cities = docs.map((city) => {
                return city._doc;
            });

            res.status(200).send(cities);
        }).limit(MAX_RESULTS);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
