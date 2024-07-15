# Installation

## Deploy the PlantD Operator

The easiest way to set up operator is to use the `bundle.yaml` deployments.

```shell
# Install the K6 Operator
curl https://raw.githubusercontent.com/grafana/k6-operator/main/bundle.yaml | kubectl create -f -

# Install the Prometheus Operator
curl https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml | kubectl create -f -

# Install the PlantD Operator
curl https://raw.githubusercontent.com/CarnegieMellon-PlantD/PlantD-operator/main/bundle.yaml | kubectl create -f - 

# Get the Studio service hostname
kubectl get svc plantd-studio -n plantd-operator-system -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

## Enable Thanos (Metrics Persistence)

Prometheus metrics storage is ephemeral. To enable long-term metrics persistence, PlantD uses Thanos to store and retrieve metrics from an S3 Bucket. 

To enable Thanos, follow below steps - 
1. Create a new access key in AWS for thanos.
2. Run script https://github.com/CarnegieMellon-PlantD/PlantD-operator/blob/main/misc/setup_thanos_storage.py to setup thanos infrastructure. 
Usage - `setup_thanos_storage.py <bucket_name> <access_key> <secret_key>`.
The script  - 1. creates a new S3 bucket, 2. attaches iam policy to user to access the S3 bucket, and 3. Creates thanos secret with the given access_key & secret_key.
3. Set `thanosEnabled: true` in `plantdcore` CR spec

After this, thanos sidecar, querier and store should be deployed in the k8s cluster and metrics will be fetched from Thanos.

### Note
* It may take up to 2-3 minutes for the PlantD Studio to be available at the above hostname.
* If running locally in minikube, services of type LoadBalancer can't be assigned a public IP address directly as they would in a cloud environment. 
    * Use this command to expose the PlantD service frontend endpoint - `minikube service plantd-studio-service -n plantd-operator-system`.

## Run Experiment with Test Pipeline (Optional)

If you have deployed the [test pipeline](/docs/tutorial/test-pipeline), you can use the YAML files under the `plantd_yamls` directory to setup an experiment.
