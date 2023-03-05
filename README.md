# HTTP DNS Delegate

This is a quick and dirty webserver for setting up a webserver to delegate DNS.


## Building Static Pages

- Install [swagger-codegen-cli](https://hub.docker.com/r/swaggerapi/swagger-codegen-cli).
- Run codegen.
  ```bash
  podman run docker.io/swaggerapi/swagger-codegen-cli generate -i doc/openapi.yml -l html
  ```