# TG Watch

A SvelteKit application for viewing and managing chat messages.

## Development

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev

# In another terminal, start the mock API
pnpm mock-api
```

## Docker Deployment

This application is dockerized for easy deployment on a Linux server.

### Prerequisites

- Docker
- Docker Compose

### Deployment Steps

1. Clone the repository on your Linux server:

```bash
git clone <repository-url>
cd tg-watch
```

2. Build and start the Docker containers:

```bash
docker-compose up -d
```

This will:
- Build the Docker image
- Start the application container
- Expose the SvelteKit app on port 3000
- Expose the mock API on port 3001

3. Verify the application is running:

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f
```

4. Access the application:
   - SvelteKit app: http://your-server-ip:3000
   - Mock API: http://your-server-ip:3001/chats

### Configuration

The application uses the following environment variables:

- `NODE_ENV`: Set to `production` for production deployment
- `PORT`: The port for the SvelteKit application (default: 3000)

You can modify these in the `docker-compose.yml` file.

### Stopping the Application

```bash
docker-compose down
```

### Updating the Application

```bash
# Pull the latest changes
git pull

# Rebuild and restart the containers
docker-compose up -d --build
```

## Architecture

The application consists of two main components:

1. **SvelteKit Frontend**: A web application for viewing and managing chat messages
2. **Mock API**: An Express server providing chat data

In the Docker environment, both components run in the same container for simplicity.

## How to setup
- Install pnpm
- Run pnpm mock-api:watch to run mock server
- Run pnpm dev (will be run on 5173 port)
