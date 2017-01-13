FROM node:latest

RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
COPY . /usr/src/app/

EXPOSE 80

CMD ["node_modules/forever/bin/forever", "--minUptime", "2000", "--spinSleepTime", "1000", "start.js"]
