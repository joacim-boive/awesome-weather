#!/usr/bin/env bash

cd /server/node && cat > .env << EOF
API_KEY = a4a097d42d59eb33209d88e5c5041f3f
EOF

cd / && yarn install
cd /server/node && npm install
cd /server && docker-compose up --build
