FROM mongo:3.5.11

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update \
	&& apt-get install -y wget

RUN wget http://bulk.openweathermap.org/sample/city.list.json.gz \
    && gzip -f -d city.list.json.gz

COPY docker_entrypoint.sh .

RUN chmod +x /usr/src/app/docker_entrypoint.sh
ENTRYPOINT ["/usr/src/app/docker_entrypoint.sh"]