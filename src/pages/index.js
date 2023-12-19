import React from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import logoTEELLabs from '../images/teel-labs-logo.png';
import logo99PLabs from '../images/99p-labs-logo.png';

import styles from './index.module.css';

function Header() {
  return (
    <header className={clsx('bg-amber-500 dark:bg-amber-700 py-20 transition-all', styles.logoBackground)}>
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
        <Heading as="h1" className="text-6xl">
          PlantD
        </Heading>
        <p className="text-2xl">
          <strong>P</strong>erformance, <strong>L</strong>atency <strong>AN</strong>alysis
          and <strong>T</strong>esting for <strong>D</strong>ata pipelines
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-12">
          PlantD is a harness for measuring the performance of data pipelines during and after development.
          PlantD collects a standard suite of metrics and visualizations,
          for use when developing or deciding among data pipeline architectures, configurations, and business use cases.
        </p>
        <Link as="button" className="button button--secondary button--lg" href="/docs/intro">
          Get Started
        </Link>
      </div>
    </header>
  );
}

function Main() {
  const cardCls = React.useMemo(() => 'p-4 border-solid border-gray-100 bg-transparent dark:border-gray-800 dark:bg-gray-800 rounded-lg shadow-sm', []);

  return (
    <main className="py-12 transition-all">
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
        <Heading as="h1">Concepts</Heading>
        <p>
          To use PlantD to measure a data pipeline, configure it with the following information:
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4">
          <div className={cardCls}>
            <Heading as="h2">Your Endpoint</Heading>
            <p className="mb-0">
              How to reach your pipeline-under-test: a description of the pipeline you want to measure,
              including at least an IP address and port number to send data in,
              and tags that uniquely identify your pipeline's resources on your cloud provider.
            </p>
          </div>
          <div className={cardCls}>
            <Heading as="h2">Your Data Schema</Heading>
            <p className="mb-0">
              The data schema that your pipeline requires as input, that is, what data items are fed into the pipeline,
              as well as their data format and allowable values. From this, PlantD will generate a dataset:
              a quantity of generated fake data that meets that schema, for use in testing.
            </p>
          </div>
          <div className={cardCls}>
            <Heading as="h2">A Load Pattern</Heading>
            <p className="mb-0">
              How fast and for how long should experimental data be fed to your pipeline? For example: 100 records per
              second steadily for 5 minutes, then ramping up over 1 minute to 200 records per second, staying steady for
              10
              minutes, then ramping down to 0 over a 2 minute span.
            </p>
          </div>
          <div className={cardCls}>
            <Heading as="h2">Your Experiment</Heading>
            <p className="mb-0">
              PlantD's load generator will send data to your pipeline following this pattern, and collect metrics: cost,
              latency, and throughput.
            </p>
          </div>
        </div>

        <Heading as="h1" className="mt-12">Prerequisites</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4">
          <div className={cardCls}>
            <Heading as="h2">A Data Pipeline</Heading>
            <p className="mb-0">
              PlantD can measure performance of many data pipelines. The pipeline can be implemented on premises,
              in a commercial cloud, or on a Kubernetes cluster. Your pipeline should not be in production;
              PlantD's load generator will send synthetic data to your pipeline;
              real traffic will not only interfere with the experiment, but also be contaminated by the synthetic data.
              If you just want to experiment, we provide a toy data pipeline for experimenting.
            </p>
          </div>
          <div className={cardCls}>
            <Heading as="h2">A Kubernetes Cluster</Heading>
            <p className="mb-0">
              We recommend running PlantD on a Kubernetes cluster. Most commercial cloud providers provide easy ways to
              set
              up such clusters. If you want to experiment, you can run a small cluster on your local machine using
              minikube.
            </p>
          </div>
        </div>

        <Heading as="h1" className="mt-12">Source Code</Heading>
        <Heading as="h2"><Link
          href="https://github.com/CarnegieMellon-PlantD/PlantD-operator">PlantD-operator</Link></Heading>
        <p>
          contains the Kubernetes operator, backend server, and data generator.
          The tool can be operated using the Kubernetes command line tool, kubectl.
        </p>
        <Heading as="h2"><Link
          href="https://github.com/CarnegieMellon-PlantD/PlantD-Studio">PlantD-Studio</Link></Heading>
        <p>
          is a web-based management UI deployed along with the operator.
          The tool can also be operated using this GUI interface.
        </p>
        <Heading as="h2"><Link
          href="https://github.com/CarnegieMellon-PlantD/plantd-test-pipeline">plantd-test-pipeline</Link></Heading>
        <p>
          contains the files to setup an simple pipeline-under-test and an example experiment.
        </p>

        <Heading as="h1" className="mt-12">About Us</Heading>
        <p>
          PlantD is maintained by CMU's TEEL Labs, and funded by Honda's 99P Labs. Get in touch with us if you have
          questions or comments. PlantD is a work in progress; we're eager to find out how you're using PlantD, and how
          we can improve it.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4">
          <div className={clsx(cardCls, 'flex items-center gap-4')}>
            <img src={logoTEELLabs} alt="TEEL Labs Logo" className="w-24" />
            <div>
              <Heading as="h2">TEEL Labs</Heading>
              <p>TEEL is a research group at Carnegie Mellon University, led by Professor Majd Sakr.</p>
              <p>Email: <Link href="mailto:teel@andrew.cmu.edu">teel@andrew.cmu.edu</Link></p>
            </div>
          </div>
          <div className={clsx(cardCls, 'flex items-center gap-4')}>
            <img src={logo99PLabs} alt="99P Labs Logo" className="w-24" />
            <div>
              <Heading as="h2">99P Labs</Heading>
              <p>99P Labs is a research group at Honda Research Institute USA, Inc.</p>
              <p>Email: <Link href="mailto:support@99plabs.com">support@99plabs.com</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <Header/>
      <Main/>
    </Layout>
  );
}
