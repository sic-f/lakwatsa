import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://picsum.dev/**'), new URL('http://localhost:5082/**')],
    dangerouslyAllowLocalIP: true
  },
};

export default nextConfig;
