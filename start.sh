#!/bin/bash
# docker build -t fastfi/react client/
docker build -t fastfi/api server/
docker-compose up
