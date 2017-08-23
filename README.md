# Awesome Weather

# Project Title

Get your daily weather fix in a fast and easy to use way!


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

* Recent version of Docker, you can[get that here](https://www.docker.com/get-docker). 
* [Get Yarn](https://yarnpkg.com/en/docs/install) - For package management.
  * You can use npm if your prefer, just replace the yarn command with npm instead.
* An API key from OpenWeatherMap - [you can get that here](http://openweathermap.org/appid).
* Create an .env-file in the server-directory.

```
/server/.env - Contains the API-key

COMPOSE_PROJECT_NAME = aw1 # This can be anything, just to make life with docker easier.
API_KEY = put-your-api-key-here
```

If you plan to make any modifications to the Node backend you should have Node installed as well,
so you don't have to re-build your docker image during development.
* [Node v8.3.0](https://nodejs.org/en/download/current/), or later.


### Installing

A step by step series of examples that tell you have to get a development env running

Firstly, we need to install our dependencies to be able to run the project:
```
In a terminal, from the project root:
yarn install

```

If you plan to do any local development you need to install the dependencies for Node,
otherwise you may skip this step:

```
In a terminal, from the server directory:
npm install

```

Then, we need to build the Docker images that will hold our environment with needed data.
You only need to do this first step once, unless you make any changes in the server-directory.
In that case, just issue the below command again.

```
In a terminal, from the server-directory:
docker-compose build

```

With the Docker images built we need to bring up our environment:

```
In a terminal, from the server-directory:
docker-compose up
```

You should now have a NodeJS server running at [http://localhost:3000](http://localhost:3000)
and a MongoDatabase running at [http://localhost:270127](http://localhost:270127)


Now we only need the frontend part:
```
In a terminal, from the project root:
yarn start

```

## Managing Docker

You can stop the environment using the docker-compose stop command:
```
In a terminal, from anywhere:
docker-compose stop
```

To bring it up again:
```
In a terminal, from server-directory:
docker-compose up
```

Or, if you just wish to bring up just one of the servers:
```
In a terminal, from server-directory:
 
- To bring up node:
docker-compose up node
 
- To bring up Mongo:
docker-compose up mongo-server
```


## Running the tests

Explain how to run the automated tests for this system


## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds


## Authors

* **Joacim Boive** - *Initial work* - [joacim-boive](https://github.com/joacim-boive)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc


TODO

* Add NGINX to the docker setup and serve the static files thru there.
  * We could use Node, but NGINX is way faster and more efficient.
* Add DEV variable for Node to not use cache for API during development.
* Currently unable to debug Node inside Docker.


https://www.npmjs.com/package/cors
http://mongoosejs.com/index.html
https://github.com/Automattic/mongoose
https://docs.mongodb.com/