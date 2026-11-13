import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Prevent bundling of firebase-admin and its ESM-only dependencies (jose, jwks-rsa).
  // These must be loaded natively by Node.js at runtime, not bundled by Turbopack/webpack.
  serverExternalPackages: [
    "firebase-admin",
    "firebase-admin/app",
    "firebase-admin/auth",
    "firebase-admin/firestore",
    "@google-cloud/firestore",
    "jwks-rsa",
    "jose",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.readdy-site.link",
      },
      {
        protocol: "https",
        hostname: "readdy.ai",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
