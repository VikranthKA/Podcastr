import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"lovely-flamingo-139.convex.cloud"

      },      {
        protocol: 'https',
        hostname: 'notable-capybara-856.convex.cloud'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
    ]
  }

};

export default nextConfig;
