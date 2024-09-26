# Weather Info Server

This is an application that interacts with [OpenWeather API](https://openweathermap.org/) to provide current weather and weather forecasts for the given city location. It has been built using **Node.js**, **Express**, and **TypeScript**, and it implements **Swagger** documentation. The application can be deployed also using [Docker](https://www.docker.com/) containers.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [API Documentation](#api-documentation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Useful Docker Commands](#useful-docker-commands)
- [License](#license)

## Features
- Fetch current weather information for any city using the OpenWeather API.
- Fetch 5-day forecasts.
- Typescript-powered development for type safety and scalability.
- Swagger API documentation for easy API usage.
- Docker support for both development and production environments.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org) (version 14.x or later)
- [npm](https://npmjs.com) (Comes with Node.js)
- [Docker](https://www.docker.com/) for running in Docker
- [Docker Compose](https://docs.docker.com/compose/) for multi-container setups

## Getting started

### 1. Cloning the repository:

Clone the project to your local machine:

```
  git clone https://github.com/sakamonk/weather-info-server.git
  cd weather-info-server
```

### 2. Environment Configuration:

The application requires an `.env` file to specify environment variables such as API keys for the openWeather API. A sample environment file (`.env.example`) is provided.

The following environment variables are required in the `.env` file:

- `HOST`: Host for the server.
- `PORT`: Port for the server to listen on.
- `WEATHER_API_KEY`: API Key for the OpenWeather API.
- `WEATHER_API_BASE_URI`: Base URI for the OpenWeather API.

- `DEFAULT_UNIT`: Default unit to be used in OpenWeather API requests. Valid values are *standard*, *imperial* and *metric*.
- `DEFAULT_LANG`: Default language code to be used in OpenWeather API requests.


Create an `.env` file based on the `.env.example` file:

```
  cp .env.example .env
```

Then, fill in the required values in the `.env` file, such as:

```
SERVER_HOST=http://localhost
SERVER_PORT=3500

WEATHER_API_KEY=<Your OpenWeather API Key>
WEATHER_API_BASE_URI=https://api.openweathermap.org/
DEFAULT_UNIT=metric
DEFAULT_LANG=en
```

### 3. Running Locally (Without Docker)

#### 3.1 Install Dependencies

Run the following command to install the required dependencies:

```
npm install
```

#### 3.2 Running in Development Mode

To start the application in development mode with live reloading (using `ts-node-dev`), run:

```
npm run dev
```

The application will be available at <http://localhost:3500>.

#### 3.3 Building and Running in Production Mode

To build the TypeScript code and run the production server:

```
npm start
```

### 4. Running with Docker

You can run the application using Docker for both development and production environments.

#### 4.1 Development Mode (with live reloading)

To run the application in development mode using Docker Compose with live reloading, use:

```
docker-compose up --build
```

This will:
- Build the docker image and run the container.
- Start the application with live-reload support.
- Expose the application at <http://localhost:3500>.

#### 4.2 Production Mode

To run the application in production mode using Docker Compose, run:

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

This will:
- Build the docker image.
- Run the application in production mode with the pre-built JavaScript files.
- Expose the application at <http://localhost:3500>.


#### 4.3 Stopping the Containers

To stop the running Docker Containers, use:

```
docker-compose down
```

## API Documentation

The API is documented using **Swagger**. After starting the application, you can access the Swagger UI for API documentation at <http://localhost:3500/api-docs>.


## Available Scripts

### Running Tests

The application includes tests using **Jest** and **Supertest**. You can run the tests with the following command:

```
npm test
```

For watching tests during development, use:

```
npm run test:watch
```

You can also generate a coverage report by running:

```
npm run test:cov
```

### Linting

To check linting errors, run:

```
npm run lint
```

You can also automatically fix linting errors in the code by running:

```
npm run lint:fix
```


## Project Structure
The project follows a typical **Node.js** and **TypeScript** architecture:

```
├── .dockerignore                # Docker ignore file
├── .env                         # Environment variable file (not included in version control)
├── .env.example                 # Sample Environment variable file
├── .gitignore                   # Git ignore file
├── dist                         # Compiled JavaScript (after build)
├── Dockerfile                   # Dockerfile for building the app
├── docker-compose.yml           # Base Docker Compose file
├── docker-compose.override.yml  # Docker Compose overrides for development
├── docker-compose.prod.yml      # Docker Compose overrides for production
├── eslint.config.js             # ESLint configuration
├── jest.config.js               # Jest testing framework configuration
├── package.json                 # Node.js dependencies and scripts
├── src                          # Application source code
│   ├── controllers              # Express controllers for handling requests
│   ├── docs                     # Swagger documentation definitions
│   ├── index.ts                 # Application entry point
│   ├── interfaces               # TypeScript type definitions
│   ├── routes                   # Express route definitions
|   ├── swagger.config.ts        # Swagger configuration for API documentation
│   ├── utils                    # Helper files
├── tests                        # Test files for controllers, routes, etc.
└── tsconfig.json                # TypeScript configuration

```


## Useful Docker Commands

- Rebuild the Docker images:

```
docker-compose build
```

- Run Docker Compose in the background:

```
docker-compose up -d
```

- Stop and remove containers:

```
docker-compose down
```

- Clean up Docker volumes:

```
docker-compose down -v
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
