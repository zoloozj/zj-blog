
const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = removeImports({
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
});

module.exports = nextConfig;
