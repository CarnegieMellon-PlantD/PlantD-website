/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: {
    'Getting Started': [
      'tutorial/concepts',
      'tutorial/prerequisites',
      'tutorial/installation',
      'tutorial/test-pipeline',
      'tutorial/instrument',
      'tutorial/experiment',
      'tutorial/business',
    ],
  },
  referenceSidebar: [
    'reference/crd-api-reference',
    'reference/types-and-params',
    'reference/formulas',
  ],
};

export default sidebars;
