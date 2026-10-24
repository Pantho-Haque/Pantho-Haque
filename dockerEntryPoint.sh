#!/bin/sh
set -e

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Run the development server
echo "Starting development server..."
exec pnpm run dev