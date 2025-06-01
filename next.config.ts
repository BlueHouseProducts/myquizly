import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://images.google.co.uk/**")
    ]
  }
};

export default nextConfig;
