import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Matikan cek error TypeScript saat build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Matikan cek kerapian kode saat build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;