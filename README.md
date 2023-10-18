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
