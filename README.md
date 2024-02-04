# IL Trees Calc

[![Deployment Workflow](https://github.com/dephekt/il-trees-calc/actions/workflows/main.yml/badge.svg?event=release)](https://github.com/dephekt/il-trees-calc/actions/workflows/main.yml)

Provides a quick way to estimate state and local taxes for Illinois recreational cannabis sales.

## Development

Install nvm and use it to install node 21.6.1. Then in this repo, run `npm install`.
You can run a local development server using `npm start`. You can build with `npm run build`.

## Deployment

The site is hosted on Github Pages. When a Github Release is performed, an automated workflow
is triggered which has two jobs, to build static content and then deploy it to the `github-pages` environment.

The deployment workflow is [defined here](https://github.com/dephekt/il-trees-calc/blob/main/.github/workflows/main.yml).

The latest deployments can be [found here](https://github.com/dephekt/il-trees-calc/deployments).