# StockWise

Simple application for calculating a missed opportunities on the stock market, based on provided time slice and an available sum

## Application setup

To run the application you will need to take the following steps:

- Make sure you have `Docker` and `Docker Compose` on your machine
- Clone the repository
- run `docker compose up --build` from inside the monorepo directory
- you can access the application on `http://localhost:3000/`

This mode runs all services in containers (`mongodb`, `backend`, `frontend`).

## Development

The repository is an [Nx](https://nx.dev) workspace. Applications live in `apps/` (`stockwise-be`, `stockwise-fe`); `libs/` and `packages/` are reserved for shared code.

- Requires Node.js 22 (`.nvmrc`)
- `npm ci` to install dependencies
- Create a root `.env` from `.env.example` for backend local development
- Create `apps/stockwise-fe/.env` from `apps/stockwise-fe/.env.example` for frontend local development
- Start MongoDB: `docker compose up -d mongodb`
- `npx nx serve stockwise-be` / `npx nx serve stockwise-fe` to run apps locally
- `npm run dev` to start MongoDB and both apps together
- `npx nx build <project>`, `npx nx lint <project>`, `npx nx test <project>` for a single project
- `npx nx run-many -t build lint test` for all projects
- `npx nx lint <project> --fix` to autofix lint issues (also sorts the locale JSON keys in the frontend)
- `npx nx test <project> --watch` / `--coverage` / `--configuration=debug`
- `npx nx serve stockwise-be --configuration=debug` to start the backend with the Node inspector
- `npx nx test-e2e stockwise-be` for the backend e2e tests
- `npx nx preview stockwise-fe` to preview the production build
- `npx nx graph` to visualize the workspace
