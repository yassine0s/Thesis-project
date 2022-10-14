#! /bin/sh
rm package-lock.json # preventing the babel:fevents error from accuring
npm install

echo "building the docker image: \n\n"
docker build . -t apiserver:latest

echo "\n-------------------------------------\nRemoving junk docker images:\n";
docker images | grep "<none>" | awk '{ print $3; }' | xargs docker rmi -f; # cleaning the docker junk docker images.

