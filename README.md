# pgpdemo

nodejs openpgp demo

### docker cmd

```
docker build -t pgpdemo:1.0.0 .
docker run --name test -p 8080:8080 pgpdemo:1.0.0

# scale multiple instance
# docker run -d --name test2 -p 8081:8080 pgpdemo:1.0.0

docker exec -it test /bin/sh
```

### gcp artifact

```
gcloud init

docker tag pgpdemo:1.0.0 asia-southeast1-docker.pkg.dev/i-cattle-33874/pgpdemo/pgpdemo:1.0.0

docker push asia-southeast1-docker.pkg.dev/i-cattle-33874/pgpdemo/pgpdemo:1.0.0

# Setup gcloud artifact
gcloud auth configure-docker \
    asia-southeast1-docker.pkg.dev

# Create artifact
```
