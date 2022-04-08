.PHONY: docker
docker: Dockerfile
	docker build -t naturguckerdev .

.PHONY: sh
sh: docker
	docker run --rm -it naturguckerdev /bin/bash

.PHONY: data
data:
	mkdir -p data
	cd data; if [ ! -f "0215505-210914110416597.zip" ]; then wget https://api.gbif.org/v1/occurrence/download/request/0215505-210914110416597.zip; fi
	cd data; if [ ! -f "0215505-210914110416597.csv" ]; then unzip 0215505-210914110416597.zip; fi
