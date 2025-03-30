#!/bin/bash

# Exit on error
set -e

echo "Building docker image..."
docker build --platform=linux/amd64 -t australia-southeast2-docker.pkg.dev/reader-454209/reader-repository/reader-client:latest .

echo "Authorizing with docker..."
gcloud auth configure-docker australia-southeast2-docker.pkg.dev

echo "Pushing new image..."
docker push australia-southeast2-docker.pkg.dev/reader-454209/reader-repository/reader-client:latest

echo "Restarting deployment..."
kubectl rollout restart deployment/reader-api -n reader-app
