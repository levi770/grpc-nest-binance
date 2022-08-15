# Binance Websocket Gateway
## NestJS gRPC microservices application example

Application features:

- NestJS gRPC microservices architecture with Fastify API gateway
- Separated databases for each microservice
- JWT authorization
- Binance websocket API integration
- Admin CRUD operations and dynamic spread management
- Socket.IO gateway for currency rates streaming
- Swagger documentation and API testing environment
- Compodoc source code documentation
- Jest e2e tests
- Docker orchestration

To launch application:
1. clone this repository ```git clone https://github.com/levi770/grpc-nest-binance.git```
1. run ```cd grpc-nest-binance && cp ./auth-svc/.env-example ./auth-svc/.env && cp ./binance-svc/.env-example ./binance-svc/.env```
1. run ```docker-compose up```

After application launch:
- PgAdmin interface will be available at: http://localhost:8080
- Swagger interface will be available at: http://localhost:5000/docs
- Websocket currrency rate feed will be available at: [ws://localhost:5001/binance?ticker=BTCUSDT](http://localhost:5001/binance?ticker=BTCUSDT)

## Spread management
To get access to private server endpoints like Get and Set currency rrate spread register a new user using Swagger, then get JWT and set it as Authorization Bearer token in request headers using "Authorize" button.
![swagger](/img/Swagger_Screenshot.png)

## Websocket currency rate feed
Use postman to test the websocket endpoint and receive quotes. Select Socket.IO as the websocket client, enter the endpoint url with the ticker parameter ws://localhost:5001/binance?ticker=BTCUSDT and subscribe to the "feed" event.
![websocket](/img/Postman_Screenshot.png)

## Database management
Log in to the PgAdmin interface with default credentials from .pgadmin.env file and register the Server using credentials specified in the auth-svc and binance-svc microservices .env files
![postgres](/img/PgAdmin_Screenshot.png)