#!/bin/sh

# Utilitary Script to build and deploy a docker image to a given directory
# /!\ Script created for being used with Github Actions

# IMPORTANT ENV VARS :
# - REPOSITORY_URL -> URL of the repository server

GIT_SHORT_HASH=$(git rev-parse --short "$GITHUB_SHA")
IMAGE_NAME="$REPOSITORY_URL/monix-front-user"

docker build . -q -t $IMAGE_NAME:latest -t $IMAGE_NAME:$GIT_SHORT_HASH
docker push -q -a $IMAGE_NAME