# Prerequisites

You will need:

- A pipeline to measure
- A Kubernetes cluster (managed or standalone)
- `kubectl` with access to the cluster

## Pipeline

If you aren't ready to test your own pipeline, we supply
a [test pipeline](/docs/tutorial/test-pipeline) for demonstration.

## Kubernetes Cluster

If you don't have a kubernetes cluster handy, you can use a small test cluster
using [Minikube](https://minikube.sigs.k8s.io/docs/start/). Make sure the cluster has at least 10GB of memory assigned.

Note that this will not scale up well to measuring dataflow of large pipelines, but it's enough to experiment and find
out how PlantD works.

Type `kubectl cluster-info` to check that it's running
