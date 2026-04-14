import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Upload a wider set of source maps for readable production stack traces
  widenClientFileUpload: true,

  // Proxy Sentry requests through Next.js to bypass ad-blockers
  tunnelRoute: "/monitoring",

  // Hide source maps from client bundles
  hideSourceMaps: true,

  // Tree-shake Sentry logger statements in production
  disableLogger: true,

  // Suppress build output outside CI
  silent: !process.env.CI,
});
