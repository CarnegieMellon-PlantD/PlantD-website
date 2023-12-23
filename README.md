# PlantD Website

[![Build and Deploy to GitHub Pages](https://github.com/CarnegieMellon-PlantD/PlantD-website/actions/workflows/build-and-deploy.yaml/badge.svg)](https://github.com/CarnegieMellon-PlantD/PlantD-website/actions/workflows/build-and-deploy.yaml)
![GitHub License](https://img.shields.io/github/license/CarnegieMellon-PlantD/plantd-website?label=License)

Website for the PlantD project.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) (`>= 18.0`)
- [Yarn](https://yarnpkg.com/)

### CLI Commands

#### Install dependencies

```shell
yarn install
```

#### Start the development server

```shell
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

#### Build

```shell
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Release

This project uses GitHub Actions as our CI/CD pipeline and to deploy the website to GitHub Pages. See [`.github/workflows/build-and-deploy.yaml`](.github/workflows/build-and-deploy.yaml) for more details.

To deploy the website to GitHub Pages, simply push a new commit to the `main` branch. The GitHub Actions workflow will automatically build and deploy the website to GitHub Pages.

### References

- [Docusaurus](https://docusaurus.io/)
- [Tailwind CSS](https://tailwindcss.com/)
