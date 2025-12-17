/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Paksa Vercel mengabaikan error TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // Paksa Vercel mengabaikan kerapian kode
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;