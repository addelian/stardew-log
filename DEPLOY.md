# Build & Deploy (GitHub Pages)

This document describes the local and CI build/deploy steps for the Next.js static site exported to GitHub Pages.

## Prerequisites

- Node.js (v18+ recommended) and npm
- A GitHub repository named `stardew-log` (or update `BASE_PATH` below)

## Key files

- `next.config.js` — sets `basePath`, `assetPrefix`, and `output: 'export'` for static export.
- `package.json` — contains `build`, `predeploy`, and `deploy` scripts.
- `.github/workflows/deploy.yml` — CI: runs tests, builds, and publishes `out/` to GitHub Pages.

## Local steps

1. Install dependencies

```powershell
npm install --legacy-peer-deps
```

2. Run tests (Vitest)

```powershell
npm run test
```

3. Build (produces a static `out/` directory)

```powershell
npm run build
```

4. Preview the static output (optional)

```powershell
npx serve out -l 3000
# or
npx http-server out -p 3000
# then open http://localhost:3000
```

5. Deploy to GitHub Pages (pushes `out/` to `gh-pages` branch)

```powershell
npm run deploy
```

## Notes & configuration

- `next.config.js` includes a `BASE_PATH` (default: `/stardew-log`) and `assetPrefix`. If your repo name or pages URL changes, update `BASE_PATH` and the `homepage` field in `package.json` accordingly.
- CI workflow `.github/workflows/deploy.yml` triggers on `push` to `main`. It runs `npm ci`, `npm run test`, `npm run build`, and then uses `peaceiris/actions-gh-pages` to publish `out/`.
- The GitHub Action uses the built-in `GITHUB_TOKEN`, so no extra secrets are required for standard publish permissions.
- If you want to deploy manually without using `gh-pages`, copy the contents of `out/` to your hosting provider.

## Troubleshooting

- If build fails with `window is not defined`, guard browser APIs with `if (typeof window !== 'undefined')` before accessing `localStorage`, `innerWidth`, etc.
- If TypeScript complains about missing types for `lodash`, install `@types/lodash` as a dev dependency.

## CI on PRs

- To run tests on pull requests without deploying, add a separate workflow (or extend the existing one) triggered on `pull_request` that runs `npm ci` and `npm run test`.
