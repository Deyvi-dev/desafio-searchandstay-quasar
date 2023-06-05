# Nuxt 3 and Quasar Framework Example

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more, and [Quasar Module for Nuxt 3](https://nuxt.com/modules/quasar)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Environment Variables

To configure the application, you can use environment variables defined in a .env file. The project relies on the dotenv package to load the environment variables from the .env file.

Create a .env file at the root of the project and define the environment variables you need. For example, you can include the following line in the .env file:


NUXT_PUBLIC_API_BASE=https://exemplo.com/api/admin

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
