import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // firebase-admin subpaths are loaded via a runtime-constructed specifier in
  // src/lib/firebase/admin.ts so Turbopack never sees them statically and
  // cannot emit them as externals. Only jose/jwks-rsa need to be listed here
  // as a belt-and-suspenders guard for any other path that might pull them in.
  serverExternalPackages: [
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
