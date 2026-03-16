import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://cards.scryfall.io/**'),
      new URL('https://images.manapool.com/**')
    ],
  },
};

export default nextConfig;
