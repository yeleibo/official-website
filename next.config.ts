import withBundleAnalyzer from "@next/bundle-analyzer"
import createNextIntlPlugin from "next-intl/plugin";
import { env } from "./env.mjs"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const  withPlugins  =  require ( 'next-compose-plugins' )
//国际化
const withNextIntl = createNextIntlPlugin();

const config = {
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
}

export default withPlugins([ [withBundleAnalyzer({ enabled: env.ANALYZE })],[withNextIntl]],config)
