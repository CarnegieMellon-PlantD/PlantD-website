# Test Pipeline (Optional)

## Introduction

This test pipeline is designed to evaluate and validate the functionality of the Benchmarking Tool, PlantD. It allows you to simulate an e-commerce scenario to test the service's performance and error handling capabilities.

## Phases

The test pipeline includes three phases.

### Extract Phase
- Acts as an entry point to the pipeline
- Receives data in the form of zip files
- Extracts and puts the CSV file content on the Kafka queue

### Transform Phase
- Data validation to remove corrupt or incomplete records
- Normalization of product names, prices, and other fields for consistency

### Load Phase
- Cleaned, aggregated, and enriched data is loaded into a SQL database for further analytics.

## Usage

1. Clone the repository:

   ```shell
   git clone https://github.com/CarnegieMellon-PlantD/plantd-test-pipeline
   ```

2. Navigate to the project directory:

   ```shell
   cd plantd-test-pipeline
   ```

### Deploying the pipeline

Deploy the pipeline by applying the YAMLs under the `k8s` folder in a Kubernetes cluster.

```shell
# All pipelines are deployed in a specific namespace
kubectl create ns test-pipeline

# Apply the pipeline YAMLs to deploy the microservices, MariaDB, Kafka and Zookeeper
kubectl apply -f k8s/
```
