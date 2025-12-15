/**
 * next.config.js
 *
 * Sets `basePath` and `assetPrefix` to match the GitHub Pages repo path.
 * If you deploy to a different path, update `BASE_PATH` accordingly.
 */
// Allow overriding the base path via an env var. Default to empty for local dev.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

module.exports = {
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  // Use a different build dir for local development to avoid locked/permission
  // issues with the default `.next` folder on Windows environments.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  output: 'export',
  images: {
    unoptimized: true,
  },
};
