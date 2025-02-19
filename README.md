# Todo Application

A modern Todo application built with Angular and NestJS in an Nx monorepo.

## Features

- Task management with priorities
- Focus mode for important tasks
- Categories for better organization
- Due dates tracking
- Real-time updates

## Development Setup

### Prerequisites

- Docker and Docker Compose
- Node.js 20.x (for local development)
- npm

### Running the Application (Development Mode)

1. Clone the repository
2. Start the development environment using Docker:

```bash
docker-compose -f docker-compose.dev.yml up
```

This will:
- Install all dependencies
- Start the frontend development server
- Start the backend development server
- Configure Nginx as a reverse proxy

3. Access the application:
- Frontend: http://localhost
- API: http://localhost/api

The application supports hot-reloading for both frontend and backend changes.

### Building for Production

To build and run the production version:

```bash
docker-compose up --build
```

## Project Structure

- `apps/awesome-front` - Angular frontend application
- `apps/awesome-backend` - NestJS backend application
- `libs/frontend/todo` - Todo feature library
- `libs/backend/todo` - Backend todo module

