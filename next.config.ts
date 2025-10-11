import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://images.google.co.uk/**")
    ]
  },

  allowedDevOrigins: ["https://192.168.1.49:3000"]
};

export default nextConfig;
