#!/bin/bash
set -o errexit    # Exit on error
set -o pipefail   # Exit if any command in a pipe fails
set -o nounset    # Exit if undefined variable is used

# Define colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Log function for consistent output
log() {
  local level=$1
  local message=$2
  local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
  
  case "$level" in
    "INFO")
      echo -e "${GREEN}[INFO]${NC} ${timestamp} - $message"
      ;;
    "WARN")
      echo -e "${YELLOW}[WARN]${NC} ${timestamp} - $message"
      ;;
    "ERROR")
      echo -e "${RED}[ERROR]${NC} ${timestamp} - $message"
      ;;
  esac
}

# Check if Docker is installed and running
check_docker() {
  if ! command -v docker &> /dev/null; then
    log "ERROR" "Docker is not installed. Please install Docker first."
    exit 1
  fi
  
  if ! docker info &> /dev/null; then
    log "ERROR" "Docker daemon is not running. Please start Docker and try again."
    exit 1
  fi
  
  # Check if docker compose is available
  if ! docker compose version &> /dev/null; then
    log "ERROR" "Docker Compose is not available. Please install Docker Compose plugin."
    exit 1
  fi
  
  log "INFO" "Docker and Docker Compose are available."
}

# Check if dockerEntryPoint.sh exists
check_entry_point() {
  if [ ! -f "./dockerEntryPoint.sh" ]; then
    log "ERROR" "dockerEntryPoint.sh not found. Make sure you're in the correct directory."
    exit 1
  fi
  
  log "INFO" "dockerEntryPoint.sh found."
}

# Clean up function to handle script termination
cleanup() {
  log "INFO" "Cleaning up resources..."
  docker compose down --remove-orphans 2>/dev/null || {
    log "WARN" "Failed to stop existing containers. Continuing anyway..."
  }
}

# Register the cleanup function to be called on exit
trap cleanup EXIT INT TERM

# Main execution starts here
main() {
  log "INFO" "Starting deployment process..."
  
  # Check dependencies
  check_docker
  check_entry_point
  
  # Stop any running containers from previous runs
  log "INFO" "Checking for existing containers..."
  if docker compose ps --services | grep -q .; then
    log "INFO" "Stopping existing containers..."
    docker compose down || {
      log "WARN" "Failed to stop existing containers. Continuing anyway..."
    }
  else
    log "INFO" "No existing containers found."
  fi
  
  # Small pause to ensure resources are released
  log "INFO" "Waiting for resources to be released..."
  sleep 2
  
  # Make entry point executable
  log "INFO" "Making dockerEntryPoint.sh executable..."
  chmod +x dockerEntryPoint.sh || {
    log "ERROR" "Failed to make dockerEntryPoint.sh executable. Check file permissions."
    exit 1
  }
  
  # Start the containers
  log "INFO" "Building and starting containers..."
  docker compose up --build --remove-orphans || {
    log "ERROR" "Failed to start containers. Check the Docker logs for more information."
    exit 1
  }
}

# Execution
pnpm install
chmod +x .husky/pre-commit .husky/commit-msg
main