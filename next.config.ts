import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <== permet de continuer le build malgré les erreurs ESLint
  },
  /* config options here */
};

export default nextConfig;
