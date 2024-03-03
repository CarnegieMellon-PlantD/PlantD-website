# Instrumenting a pipeline

For PlantD to collect information about how your pipeline
gathers data, it needs to be "instrumented" -- that is, you 
need to add logging statements letting PlantD know when data
enters and exits each phase of the pipeline.

To do this, you'll need to do the following:

1. Install the OpenTelemetry library
for the language your pipeline is written in.
2. For each stage of the pipeline that you wish to be
reflected in PlantD analysis, set up OpenTelemetry
to measure the top level function of that stage as
a "span".  OpenTelemetry will create a log when the
stage begins, and when it exits, capturing the duration
of each data item's processing by that phase.  It will
also track data passing from one phase to the next. 

We have already done this for you in the optional test pipeline,
so you can look at it as a worked example.
