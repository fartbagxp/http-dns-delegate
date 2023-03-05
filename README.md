# HTTP DNS Delegate

This is a quick and dirty webserver for setting up a webserver to delegate DNS.

## Building Static Pages

- Go to [Swagger Editor](https://editor.swagger.io/).
- Copy and paste [openapi.yml](doc/openapi.yml).
- Click **Generate Client** > **html2**.
- Extract and drop/replace index.html into [html folder](html/index.html).

## Run Requirement

- [NodeJS 18.14.2+](https://nodejs.org/en/download/)

## How to run

To start the webserver, run one of the following commands:

> `npm start` to start the server on port 8000  

> `SERVER_PORT=8081 npm start` to start the server on port 8081

Test it out by navigating to [localhost:8080](http://localhost:8080) or [localhost:8080/google.com](http://localhost:8080/google.com).