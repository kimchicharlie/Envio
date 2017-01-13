ORG = envio
NAME = web-app
SHA1 = $(shell git log -1 --pretty=oneline | cut -c-10)
BRANCH = $(shell git branch -a --contains $(SHA1) | egrep '(remotes/|\*)' | egrep -v "(HEAD|detached)" | head -1 | sed -e "s/\* //" -e "s/.*\///")
VERSION = $(BRANCH)-$(SHA1)
WEB_PORT = 8085

all: build

build:
	docker build --rm -t $(ORG)/$(NAME):${VERSION} .
	docker tag  $(ORG)/$(NAME):${VERSION} $(ORG)/$(NAME):$(BRANCH)-latest

clean:
	docker kill web-app && docker rm web-app

run:
	docker run \
		--name web-app \
		-p $(WEB_PORT):$(WEB_PORT) \
		--net="host" \
		-e TZ="Europe/Paris" \
		-v $(shell pwd):/src \
		-v $(shell pwd)/data:/data \
		-d $(ORG)/$(NAME):${VERSION}

.PHONY: all build clean run
