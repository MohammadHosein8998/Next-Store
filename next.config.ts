import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/assets/**",
      },
    ],
  },
  experimental:{
    serverActions:{
      bodySizeLimit : '4mb'
    }
  }
};

export default nextConfig;
