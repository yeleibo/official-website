import withBundleAnalyzer from "@next/bundle-analyzer"
import createNextIntlPlugin from "next-intl/plugin";
import { env } from "./env.mjs"

const  withPlugins  =  require ( 'next-compose-plugins' )
const withNextIntl = createNextIntlPlugin();

const config = withPlugins([ [withBundleAnalyzer({ enabled: env.ANALYZE })],[withNextIntl]], {
  output: "standalone",
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
})

export default config
