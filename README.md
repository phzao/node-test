# Project: Vehicle API

Vehicle API is a RESTful service for managing vehicle data, built using NestJS.

## Prerequisites

To run this project, ensure you have the following installed:

- [**Docker** - to containerize and run the application](https://docs.docker.com/engine/install/)
- [**Docker Compose** - to manage and start the containers](https://docs.docker.com/engine/install/)
- [**pnpm** - for dependency management and running scripts](https://pnpm.io/installation)
- [**Node.js** - version 18 or higher ](https://nodejs.org/en)

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
   
### API Documentation with swagger

After start the project, the documentation is on http://localhost:3000/api

# Running SonarQube for Code Analysis

## Prerequisites

To analyze the code with SonarQube, ensure that SonarQube is running on an accessible server, such as an EC2 instance.

Follow the instructions in this guide for installation and configuration: [Install SonarQube and Sonar Scanner in a TypeScript Project](https://medium.com/@phbotelho/install-sonarqube-sonar-scanner-docker-in-atypescript-project-133ad5c0daa0). After setting it up, obtain the credentials required for the scanner.

## Configuration

1. **Save Credentials:**
   Add the SonarQube credentials to your `.env` file, ensuring they are available for authentication.

2. **Run the Sonar Scanner:**
   Decide how frequently you want to run the scanner, like:

   - **On each commit:** Configure a Git hook to trigger the scanner on every commit.
   - **On each merge:** Set up the scanner to run as part of your CI/CD pipeline for every merge.
   - **Another way:**

3. **Quality Gate (Optional):**
   Configure a "Quality Gate" in SonarQube to enforce a minimum code quality threshold. If the code does not meet the threshold, the deployment can be blocked.

   The configuration needed to enforce code quality standards is in the `sonar-project.properties` file. You can adjust the settings as needed to fit your project requirements.
