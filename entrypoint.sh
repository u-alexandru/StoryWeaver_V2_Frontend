#!/bin/bash
set -e

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    npm install
fi

# Serve the application
ng serve --host 0.0.0.0 --port 4200