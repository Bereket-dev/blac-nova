import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keep firebase-admin (and its JWKS stack) out of the Turbopack/webpack
  // server bundle so Node loads them from node_modules at runtime.
  // firebase-admin is already on Next's default list; the extras cover the
  // transitive Auth/Firestore deps that otherwise get partially bundled.
  serverExternalPackages: [
    "firebase-admin",
    "firebase-admin/app",
    "firebase-admin/auth",
    "firebase-admin/firestore",
    "@google-cloud/firestore",
    "@google-cloud/storage",
    "google-auth-library",
    "jwks-rsa",
    "jose",
  ],
  images: {
    remotePatterns: [
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
