# Instrumenting a pipeline

For PlantD to collect information about how your pipeline
gathers data, it needs to be "instrumented" -- that is, you 
need to add logging statements letting PlantD know when data
enters and exits each phase of the pipeline.

To do this, you'll need to do the following:

1. Setup the Open Telemetry library for your pipeline's programming language(s).  For python, for example, it's https://opentelemetry.io/docs/languages/python/getting-started/
2. Setup the the PlantD Collector on a VM as a Docker container making sure the collector is either reachable either through a local IP or a Public IP - follow the instructions here: https://github.com/CarnegieMellon-PlantD/plantd-test-pipeline/blob/main/docker-compose.yml#L67-L75
3. Initialize the OpenTelemetry library following instructions here. Make sure tracer name should remain the same across all the phases
4. Add Open Telemetry "tracers" to each stage of your pipeline.  This is code that logs the start and end of the "span" defining when a data item first arrives, then leaves, some stage or part of your pipeline.  An example of this code can be found in our test pipeline here: https://github.com/CarnegieMellon-PlantD/plantd-test-pipeline/blob/23ecad792e49b88cfa819408d3e3f3099f89e8a6/phase1.py#L80


