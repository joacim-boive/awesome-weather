#!/usr/bin/env bash

if [ ! -f .initialized ]; then
    echo "Seeding mongo..."
    mongoimport --host mongo-server --db cities_db --collection cities_collection --type json --jsonArray --file /usr/src/app/city.list.json
    touch .initialized
fi
