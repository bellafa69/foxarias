import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fill the 2048→3840 gap so retina screens get a 3200px step
    // rather than jumping straight to a 3840px request from a 4500px source.
    deviceSizes: [640, 828, 1080, 1920, 3200, 3840],
  },
};

export default nextConfig;
