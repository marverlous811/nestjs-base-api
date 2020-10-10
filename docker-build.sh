npm run build

DOCKER_TAG=$IMAGE:$VERSION
docker build -t $DOCKER_TAG -f Dockerfile .
if [[ -n $PUSH && $PUSH == "true" ]]; then 
docker push $DOCKER_TAG
fi
