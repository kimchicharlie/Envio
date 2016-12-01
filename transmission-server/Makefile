ORG = envio
NAME = transmission-server
SHA1 = $(shell git log -1 --pretty=oneline | cut -c-10)
BRANCH = $(shell git branch -a --contains $(SHA1) | egrep '(remotes/|\*)' | egrep -v "(HEAD|detached)" | head -1 | sed -e "s/\* //" -e "s/.*\///")
VERSION = $(BRANCH)-$(SHA1)
WEB_PORT = 8082

all: build

build:
	docker build --rm -t $(ORG)/$(NAME):${VERSION} .
	docker tag  $(ORG)/$(NAME):${VERSION} $(ORG)/$(NAME):$(BRANCH)-latest

clean:
	docker kill transmission-server && docker rm transmission-server

run:
	docker run \
		--name transmission-server \
		-p $(WEB_PORT):$(WEB_PORT) \
		--net="host" \
		-e TZ="Europe/Paris" \
		-v $(shell pwd):/src \
		-v $(shell pwd)/data:/data \
		-d $(ORG)/$(NAME):${VERSION}

.PHONY: all build clean run