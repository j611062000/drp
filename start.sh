#!/bin/bash

# Navigate to the project directory (optional if script is already there)
cd "$(dirname "$0")"

# Build and start Docker containers
docker-compose up --build
