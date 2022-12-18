## Learn K8S

- Learning K8S and implementing graceful shutdown with ExpressJS


## Prerequisite

- Docker Desktop
- Install Kubernetes inside Docker Desktop
- NodeJS


## Step to build Docker images and Deploy to K8S
- We need to provide minimal 2 different Docker images to perform an update on K8S
- Let's say it will be
  1. `learning/k8s-webservice:1.0.0`
  2. `learning/k8s-webservice:1.0.1`
- Build Docker Images
  1. `docker build --no-cache -t learning/k8s-webservice:1.0.0 -f ./app-1.0.0/Dockerfile .`
  2. `docker build --no-cache -t learning/k8s-webservice:1.0.1 -f ./app-1.0.1/Dockerfile .`
- Deploy to K8S
  1. `kubectl apply -f nodejs.app-1.0.0.yaml`
  2. `kubectl apply -f nodejs.app-1.0.1.yaml`
- You can access the exposed API from your local machine with the endpoint `http://localhost:30100`
- When you make an update to K8S, you can see the update logs on the menu `Docker Desktop -> Containers` then search image name `learning/k8s-webservice:1.0.0` or `learning/k8s-webservice:1.0.1`, depending on the deployment configuration you used. You will see logs like this when you deploy new configuration.
  ```
  2022-12-18 10:12:18 Listening to PORT: 8080
  2022-12-18 10:31:28 [log]:  / {}

  -- This line indicates that a new deployment happened --
  2022-12-18 11:13:18 beforeShutdown
  2022-12-18 11:13:26 server is starting cleanup
  2022-12-18 11:13:28 [sleep-log] test-2
  2022-12-18 11:13:31 [sleep-log] test-3
  2022-12-18 11:13:32 [sleep-log] test-1
  ```

### References
- [Kubernetes Crash Course for Absolute Beginners](https://www.youtube.com/watch?v=s_o8dwzRlu4)
- [K8S Docs](https://kubernetes.io/docs/home/)
- [A deep dive into Kubernetes Deployment strategies](https://www.educative.io/blog/kubernetes-deployments-strategies)
- [ExpressJS - Health Checks and Graceful Shutdown](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html)
- [Github - Terminus](https://github.com/godaddy/terminus)
- [Github - NodeJS Docker Image](https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image)
- [Github - NodeJS Docker Image Best Practice](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Stackoverflow - Access a Kubernetes Service running locally in Docker For Desktop?](https://stackoverflow.com/a/55704643)