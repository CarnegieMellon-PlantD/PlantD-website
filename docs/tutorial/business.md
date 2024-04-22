# Business Analysis

## Overview

This set of PlantD resources lets you lay out a prediction
of what inbound traffic will look like for a year of
operation, with its seasonal or daily highs and lows,
and estimate the total cost, overall performance.
You can now extrapolate from experiments to assess
the business implications of using the pipeline. 

Regular Flow: Digital Twin constructed from user-defined experiments
![Diagram shows a flowchart.  Several experiments point to Digital Twin.  Traffic Model points to Traffic Pattern.  Traffic Patterna and Digital Twin point to Simulation, the final box in the chart. Explanations within each box match explanations in the text below this diagram](ba_workflow.png)

Schema Aware Flow: Digital Twin triggers creation of an appropriate set of experiments
![Diagram shows a flowchart, a superset of the previous chart.  It adds a back arrow showing that Digital Twin triggers creation of the experiments that it will rely on.  Two new boxes are NetCosts and Scenario, both of which also feed into Simulation. Explanations within each box match explanations in the text below this diagram](ba_sa_workflow.png)


The business analysis has two operation modes, "regular"
and "schema aware".

In the "regular mode", if you have run one or more experiments on a pipeline, 
you can now extrapolate from those experiments. This mode
assumes the pipeline is fed by a single, stable, mix of data
schemas, and only attempts to model variation in the total 
quantity of data.

In the "schema aware" mode, the digital twin will automatically
create a set of experiments that test how the pipeline reacts
differently with a different mix of schemas; it uses linear
regression to generalize how a pipeline will react to new 
mixes of schemas in the future.  In this mode, after the experiments
are run, the modeler can create a "scenario" specifying a new mix
of schemas, and run simulations predicting pipeline performance,
without needing to rerun experiments.

Additionally, in schema-aware mode, a "Net Costs" object may be
specified, which additionally predicts network and storage costs 
in the simulation, based on the raw amount of traffic coming in to the system.


## Experiment

To run an analysis, you should start by conducting [Experiments](experiment.md).
In principle, many experiments with different mixes of
dataset contents and load patterns can expose a variety of pipeline behaviors,
which the Digital Twin can use to construct an accurate model.

If you want to vary the mix of schemas in your simulation, the digital twin
will create the experiments for you.

## Digital Twin

The digital twin summarizes a set of experiments, mathematically, to 
describe the likely cost, latency, and throughput of a pipeline given a 
fluctuating load level.  

Note that the digital twin CANNOT process a real dataset, just a
time series describing the SIZE of a dataset.  If your pipeline behaves
differently depending on the content of the data, the digital twin
cannot capture that.

As an open source project, you can of course create more sophisticated
analyses of experiments to produce more advanced twins; but out of
the box we provide the following kinds of twin:

- *simple* analyzes the first experiment in the list, assumes that the
load pattern exceeds the pipeline's throughput capabilities, and thus
uses the maximum throughput as the pipeline's peak.  The model it builds
assumes the pipeline cannot scale beyond this, but has an infinite queue
to handle load faster than that throughput.  It assumes cost does not
depend on the load, just on the length of time the pipeline is running.

- *quickscaling* uses the *simple* model as a base, but assumes an
optimal horizontal scaling algorithm.  Thus latency is never affected
by queuing, but cost is proportional to the number of instances necessary
to handle any given amount of load.

If you are building a schema-aware Digital Twin, that is, one that
behaves differently depending on which data schemas are more prevalent in
the input, then choose "schemaaware" as the twin type.  If you do this,
you will also need to supply the following:
- *dataset* should be the name and namespace of an existing dataset that
has been tested to work with the pipeline.  When you save the twin object,
it will use this dataset to create a set of experiments that borrow 
schemas from this dataset, but vary in their quantities.
- *maximum rps* limits the total quantity of data that these new
experiments will send to the pipeline.  Choose something 50-70 percent
higher than what you believe the pipeline can handle.  The exact quantity
doesn't matter too much.  If the pipeline autoscales to handle any
quantity, this simulation will not work well -- you'll need to modify
the business analysis code to add more sophisticated experimental analysis
to build a specialized simulation.

## Traffic Model

The traffic model is a set of parameters abstractly describing the load
a pipeline will face over some projected future year.  There is currently
no GUI to create this model; you must download a JSON file, edit or replace it
manually or using your own scripts, then upload a replacement.

The parameters are as follows:
- `start_row_cnt`: The average number of records per second received at the
start of the year, ignoring daily and monthly variations
- `yearly_growth_rate`: By what factor is traffic expected to grow or shrink
over the course of the year?  For example 1.0 means no overall change despite
monthly and weekly variation; 0.5 would mean an overall shrinkage of data
ingestion by 50%.
- `model_name`: You can safely ignore this; it can be used to represent the 
provenance of your data; however this is
not the name used by PlantD; it's for your own documentation purposes.  The name
used by PlantD is specified in the user interface.
- `corrections_monthly`: For each month of the year, a correction factor
reflecting how much higher or lower traffic will be that month compared to
the average.  1.0 means a typical month; 1.5 means 50% more traffic than
usual.  These twelve numbers should average to 1.0.  The format of this
array is a json record, with fields:
   - `data`: a comma-separated list of 12 values
   - `index`: a comma-separated list of the numbers from 1 to 12, representing corresponding months
   - `index_name`: the name of this index, `Month`
   - `name`: the name of this data series, `row_cnt_seasonal_correction`
- `corrections_hourly`: For each hour of a week, a similar correction factor
reflecting how much higher or lower traffic will be at that hour of the
typical week.  The format of this array is a json record, with fields:
   - `data`: a comma-separated list of 168 values (i.e. 24 hours x 7 days)
   - `index`: a comma-separated list of lists of day-hour pairs:  `[["FRI", 0], ["FRI", 1], ["FRI", 2],...`
        the order doesn't matter as long as they align with the data 
   - `index_names`: a list containing the names of the two indexes, `["DOW", "Hour"]`
   
## Traffic Pattern

This is an internal object not visible to the user -- it is an hour by hour prediction of 
input load, generated by working out the implications of the Traffic Model.

Note that in the case of a Schema Aware simulation with a Scenario provided, the scenario
controls the overall quantity of data of each schema in each month; the traffic pattern
is used to add daily highs and lows to it.

## Net Costs

This object gives the cost of auxiliary services around the data pipeline, to help give
a broader estimate of costs.  Fields include:

- *Net Cost per MB*: How much it costs to send one Megabyte of data from the
place your data is generated, to your pipeline's ingestion point. 
- *Raw data retention policy*: How many months you will save raw data.
- *Raw data store cost/MB/Month*: How much it costs per megabyte to store data for
a month.  We assume the raw data will be placed in storage at this rate.
- *Processed data retention policy* and *Procssed data storage cost per month*: Not 
currently used; the data storage of processed data is not currently transparent to
PlantD; you can modify the simulation engine to use these fields if you have
your own way of estimating these.

## Scenario

The scenario object specifies your predictions of how often you expect different kinds
of data to actually be sent to the pipeline, in production, so you can experiment with
these numbers and see how costs vary.  The "kinds of data" here refers to the Schema
object discussed earlier in the documentation; we also call these "tasks", since they
might represent different activities the input devices are performing.

For each schema/task, enter the following information:
- *name* identifies the schema.  It must be a Schema object defined in the same
namespace as the scenario.
- *size* is your estimate of the size of one unit of this data. A useful future
improvement of PlantD would be to autopopulate this with the size of data items generated 
in the Dataset, based on your itemization of the parts of the schema.  This is
specified in "humanfriendly" data size: e.g. "100Ki" means 100 Kibibytes, or
102,400 bytes.
- *sendingDevices*: Maximum and minimum estimates of the number of devices that
will send this particular schema.  Ex: If you have 10000 cars on the road, all
sending data to your pipeline, put 10000 in both blanks.  If you have high and low
estimates, then fill the max and min appropriately.
- *pushFrequencyPerMonth*: How many times ONE of these devices will send this
data item, per month.  For example if a car will send an engine status record
every ten minutes it is driving, and you expect the average car to drive about 2 hours
a day, then enter 600 (6 times an hour, times 2 hours a day, times 30 days).
- *list of relevant months* is a list of numbers from 1 to 12, representing which
months this prediction applies to.  If the month doesn't matter, enter all numbers
from 1-12.  If your predictions vary by month, then enter the schema 12 times, with
different values of

## Simulation

In the user interface, each simulation represents a different pairing of a digital twin with a 
traffic model.  We believe it will be useful to create "minimal pairs" of simulations, which
differ either by traffic model (to do a risk analysis of a pipeline, showing how it will perform
under optimistic and pessimistic predictions about traffic growth); or by pipeline (as a way of
comparing how two variants of a pipeline will perform under a given business assumption).

The latter comparison might be useful to show progress in a pipeline under development, showing
the same experiment under an original and improved implementation of a pipeline, for estimating
the projected cost savings of some improvement.

The output of the simulation indicates the digital twin's prediction of
cost, latency, throughput when presented with a traffic pattern.


