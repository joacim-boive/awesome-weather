FROM mongo:3.5.11

WORKDIR /usr/src/app


# Install wget - so we can pull the latest list of available cities.
RUN apt-get update \
	&& apt-get install -y wget

# Get the latest list available.
RUN wget http://bulk.openweathermap.org/sample/city.list.json.gz \
    && gzip -f -d city.list.json.gz

COPY docker_entrypoint.sh .

RUN chmod +x /usr/src/app/docker_entrypoint.sh

# Will seed mongo-server with the city.list.json only once, to avoid duplicates.
ENTRYPOINT ["/usr/src/app/docker_entrypoint.sh"]