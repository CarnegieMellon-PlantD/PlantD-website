# Concepts

"PlantD" stands for "**P**erformance, **L**atency **AN**alysis and **T**esting for **D**ata pipelines."

PlantD is a harness for measuring the performance of data pipelines during and after development. PlantD collects a
standard suite of metrics and visualizations, for use when developing or deciding among data pipeline architectures,
configurations, and business use cases.

To use PlantD, you configure it with the following information:

- How to reach your **pipeline-under-test**: a description of the pipeline you want to measure, including at least an IP
  address and port number to send data in, and tags that uniquely identify your pipeline's resources on your cloud
  provider.
- The **data schema** that your pipeline requires as input, that is, what data items are fed into the pipeline, as well
  as their data format and allowable values.
  - From this, PlantD will generate a **dataset**: a quantity of generated fake data that meets that schema, for use
    in testing
- A **load pattern** describing a variable rate of load generation, for example: *100 records per second steadily for 5
  minutes, then ramping up over 1 minute to 200 records per second, staying steady for 10 minutes, then ramping down to
  0 over a 2-minute span.*
  - PlantD's **load generator** will send data to your pipeline following this pattern
- A description of the **experiment** you want to run: a timed session where the *load generator* sends a *dataset* to a
  *pipeline-under-test* using a *load pattern*, and collects metrics during and after the load generation.
