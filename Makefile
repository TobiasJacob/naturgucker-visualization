.PHONY: docker
docker: Dockerfile
	docker build -t naturguckerdev .

.PHONY: sh
sh: docker
	docker run --rm -it naturguckerdev /bin/bash

