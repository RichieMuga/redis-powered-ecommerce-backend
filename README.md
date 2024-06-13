# Redis-Powered E-commerce Backend

This project aims to enhance the performance and scalability of an existing e-commerce backend system through the integration of Redis caching and basic analytics tracking.

## Motivation

- **Enhance Performance**: Utilize Redis for caching to reduce response times and alleviate database load.
- **Enable Data-Driven Decisions**: Implement user interaction tracking for insightful analytics.

## Features

### Advanced Caching
Implement Redis caching with preloading and expiry policies for improved performance.

### Cache Invalidation Strategies
Ensure data consistency via cache invalidation mechanisms triggered by database changes.

### User Interaction Tracking
Track user interactions like product views and purchases for analytics.

### Analytics Reporting
Provide summaries of tracked interactions for behavioral insights.

### Performance Monitoring
Measure and report performance improvements post-caching implementation.

### Containerization
Designed for easy deployment and scalability using Docker containers.

## Getting Started

### Prerequisites
- Node.js v20 or later
- Redis v7 or later
- Docker (optional)

### Installation

There are 2 ways to install this application
  - Using githib
  - Using docker

## Installation Using Github
1. Clone the repository:

```
git clone git@github.com:RichieMuga/redis-powered-ecommerce-backend.git
```

2. Navigate to the project directory:

```
cd redis-powered-ecommerce-backend
```

3. Install dependencies:

```
npm install
```

4. Start the Redis server (if not already running).


5. Start the application:
## Run development server

```
npm run dev
```

## Installation Using Docker

### Build Docker Image

1. Clone the repository to your local machine:

 
```
git clone https://github.com/your-repo/redis-powered-ecommerce-backend.git
```

2. Navigate to the project directory:

``` 
cd redis-powered-ecommerce-backend
```

Build the Docker image using the provided Dockerfile:

```
sudo docker-compose up --build -d
```

### Pull from Docker Public Hub Repo

Alternatively, you can pull the pre-built Docker image directly from the Docker Public Hub repository:

```
docker pull irerimugambi/redis-powered-ecommerce-backend
```

### Build Docker Images & Run Docker Compose

To build the Docker images and start the services defined in the `docker-compose.yml` file, execute:
 
```
docker-compose up --build
```

NB: This command will build the images if they don't exist or if the `Dockerfile` has changed since the last build. It will then start the containers as defined in the `docker-compose.yml` file.


## API Documentation
[API Documentation](https://redis-powered-ecommerce-backend-docum.netlify.app/) provides details on endpoints, request/response formats, and usage examples.

## Performance Benchmarks
Caching with Redis significantly reduced response times across various endpoints.

Below are the benchmark results comparing the response times before and after implementing Redis caching:

| Endpoint                         | Before Caching (ms) | After Caching (ms) | Improvement (%) |
|----------------------------------|---------------------|--------------------|------------------|
| GET /api/v1/products             | 250                 | 15                 | 94%              |
| GET /api/v1/products/:id         | 180                 | 8                  | 95.6%            |
| GET /api/v1/categories           | 120                 | 5                  | 95.8%            |
| GET /api/v1/carts/user/:userId   | 320                 | 20                 | 93.8%            |

These results demonstrate a significant reduction in response times across various endpoints, highlighting the effectiveness of Redis caching in enhancing the performance of the e-commerce backend system.


## Cache Invalidation Techniques
Implemented strategies include Cache invalidation when a certain controller changes and Time-based Expiration.

## Docker Repository and Registry
The Docker image is hosted on Docker Hub at [Docker Hub Link](https://hub.docker.com/r/irerimugambi/redis-powered-ecommerce-backend).

## Contributing
Contributions are welcome. Open an issue or submit a pull request for improvements.

