# Project: Vehicle API

Vehicle API is a RESTful service for managing vehicle data, built using NestJS.

## Prerequisites

To run this project, ensure you have the following installed:

- **Docker** - to containerize and run the application
- **Docker Compose** - to manage and start the containers
- **pnpm** - for dependency management and running scripts
- **Node.js** - version 18 or higher

## Running the Project

You have two options to run the application: using Docker or directly with `pnpm`.

### Option 1: Running with Docker

1. Build and start the Docker containers:

   ```bash
   docker-compose up
   
This will start the API on **[http://localhost:3000](http://localhost:3000)**.

### Option 2: Running with pnpm

1. Install dependencies:

   ```bash
   pnpm install
