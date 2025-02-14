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
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://1.116.107.92:9000/api/:path*",
      },
    ];
  },
})

export default config
