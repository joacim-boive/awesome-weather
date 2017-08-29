# Awesome Weather 

Get your daily weather fix in a fast and easy to use way!


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
![alt text](https://github.com/joacim-boive/awesome-weather/blob/master/screenshot.png)


### Prerequisites

* Recent version of Docker, you can [get that here](https://www.docker.com/get-docker). 
* [Get Yarn](https://yarnpkg.com/en/docs/install) - For package management.
  * You can use npm if your prefer, just replace the yarn command with npm instead.
* An API key from OpenWeatherMap - [you can get that here](http://openweathermap.org/appid).
* Create an .env-file in the server/node-directory.

```
/server/node/.env - Contains the API-key
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
In a terminal, from the server/node directory:
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
and a MongoDatabase running at [mongodb://localhost:270127](mongodb://localhost:270127)


Now we only need the frontend part:
```
In a terminal, from the project root:
yarn start

```


A [WebPack Dev Server](https://webpack.js.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx) is starting and you should now be able to open Awesome Weather here: [http://localhost:8080](http://localhost:8080)

## Managing Docker

You can stop the environment using the docker-compose stop command:
```
In a terminal, from the server-directory:
docker-compose stop
```

To bring it up again:
```
In a terminal, from server-directory:
docker-compose up
```

Or, if you just wish to bring up just one of the servers:
```
In a terminal, from the server-directory:
 
- To bring up node:
docker-compose up node
 
- To bring up Mongo:
docker-compose up mongo-server
```

**Danger Will Robinson!**

But, if you need to start all over with your docker images AND containers, then you can do:
```
In a terminal, from anywhere:
**WARNING - Removes everything related to Docker!
 
docker system prune -a
```

If you run a local Node instance you need to have mongo-server running in Docker for application to work.

## Running the tests

//TODO


## Built With

**Backend**
* [Nodejs](https://nodejs.org/en/) - Application Server
  * [express](https://www.npmjs.com/package/express) - For handling routes.
  * [apicache](https://www.npmjs.com/package/apicache) - Caching of API requests.
  * [cors](https://www.npmjs.com/package/cors) - To return proper headers for CORS.
  * [dotenv](https://www.npmjs.com/package/dotenv) - To load .env files smoothly.
  * [mongoose](https://www.npmjs.com/package/mongoose) - To make life working with MongoDb easier.
  * [request](https://www.npmjs.com/package/request) - To create the PROXY functionality.
* [MongoDb](https://www.mongodb.com/) - Database Server

**Frontend**
* [webpack](https://www.npmjs.com/package/webpack) - Just for being Awesome!
* [bootstrap](https://getbootstrap.com/) - The latest and greatest(?) CSS framework!
* [chart.js](https://www.npmjs.com/package/chart.js) - For all your charting needs
* [date-fns](https://www.npmjs.com/package/date-fns) - Because it's better then moment.js!
* [eventemitter3](https://www.npmjs.com/package/eventemitter3) - For an easy pub/sub architecture
* [hyperhtml](https://www.npmjs.com/package/hyperhtml) - For doing that virtualdom thing simple and fast!
* [list.js](https://www.npmjs.com/package/list.js) - It's Swedish! (and great! ;)
    
... And lots of coffee...

## Authors

* **Joacim Boive** - *Initial work* - [joacim-boive](https://github.com/joacim-boive)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## TODO

* Add NGINX to the docker setup and serve the static files thru there.
  * We could use Node, but NGINX is way faster and more efficient.
* Add support for debugging of node under Docker.
  * Disable API cache during debugging
* Webpack
  * Implement
    * autoprefixer
    * error handling
    * preload-webpack-plugin
    * compression-webpack-plugin
    * CommonsChunkPlugin
    * fast-memoize on the server side
