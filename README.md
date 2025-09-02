# Vandelay Energy Mock Application

The Vandelay Energy is a mock Commercial Aggregator that demonstrates the capabilities of Chorus Transact.

## Prerequisites

In order to use this mock application, you must have set up a Chorus API client application
and a Chorus AppHub application of type DERFlexibilityApp. Contact dcbel's Customer
Support to have these set up.

## Installation and configuration

The application is available as a Docker container:

```sh
docker pull ghrc.io/dcbel/vandelay-energy-demo:latest
```

There are several environment variables that must be defined for the application to work:

| Variable       | Description                                                                                                                  |
|----------------|------------------------------------------------------------------------------------------------------------------------------|
| CLIENT_ID      | Client application id. This is provided by dcbel.                                                                            |
| CLIENT_SECRET  | Client application secret. This is provided by dcbel.                                                                        |
| BASE_URL       | Base URL for Chorus API (ex.https://staging.dev.dcbel.energy)                                                                |
| TOKEN_URL      | URL for Oauth2 authentication (ex. https://login.microsoftonline.com/bd68c26a-cb93-47ca-88d7-bff52fcdde0c/oauth2/v2.0/token) |
| SCOPE          | API scope (ex.https://staging.dev.dcbel.energy/.default)                                                                     |
| CALLBACK_URL   | The callback URL were events are posted. This would normally be defined as "\<your-url\>/api/events"                         |
| APPLICATION_ID | The id of the application in Chorus AppHub. This is provided by dcbel                                                        |

If you want to persist data, then you need to mount a volume to the container path `/var/www/html/data`.

Example Docker Compose

```yaml
name: Vandelay Demo

services:
    vandelay-demo:
        container_name: vandelay-demo
        image: "ghcr.io/dcbel/vandelay-energy-demo:latest"
        environment:
          - CLIENT_ID=your client application id
          - CLIENT_SECRET= your client application secret
          - BASE_URL=https://staging.dev.dcbel.energy
          - TOKEN_URL=https://login.microsoftonline.com/bd68c26a-cb93-47ca-88d7-bff52fcdde0c/oauth2/v2.0/token
          - SCOPE=https://staging.dev.dcbel.energy/.default
          - CALLBACK_URL=https://example.com/api/events
          - APPLICATION_ID=your app id in Chorus AppHub
        ports:
            - "8081:80"
        volumes:
            - $(pwd):/var/www/html/data
```

Then you should be able to run the application at "http://localhost:8081"

If you are running the container locally on a computer behind a firewall, then Chorus will not be able to reach the
application when sending event notifications. You can overcome this by using a webhook tool like
[smee.io](https://smee.io) with this configuration:

```shell
"smee -t http://127.0.0.1:8081/api/events -u https://smee.io/<your-smee-generated-link>"
```

and setting `CALLBACK_URL=https://smee.io/<your-smee-generated-link>`

If you have mounted a volume to persist data, event notifications will be persisted between container runs.
