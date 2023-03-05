FROM node:18.14.2-alpine3.16

WORKDIR /usr/src/app
COPY package*.json ./

## no dependencies
# RUN npm install

COPY . .

## By default, only listen to the localhost interface.
## For practical usage, this might have to listen to all interfaces (0.0.0.0).
ENV SERVICE_HOST=127.0.0.1
ENV SERVICE_PORT=8000
EXPOSE ${SERVICE_PORT}/tcp

CMD [ "node", "main.js" ]