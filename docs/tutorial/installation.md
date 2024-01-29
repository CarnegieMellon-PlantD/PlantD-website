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
kubectl get svc plantd-studio-service -n plantd-operator-system -o jsonpath='{.status.loadBalancer.ingress[0].hostname}{"\n"}'
```

### Note
* It may take up to 2-3 minutes for the PlantD Studio to be available at the above hostname.
* If running locally in minikube, services of type LoadBalancer can't be assigned a public IP address directly as they would in a cloud environment. 
    * Use this command to expose the PlantD service frontend endpoint - `minikube service plantd-studio-service -n plantd-operator-system`.

## Run Experiment with Test Pipeline (Optional)

If you have deployed the [test pipeline](/docs/tutorial/test-pipeline), you can use the YAML files under the `plantd_yamls` directory to setup an experiment.
