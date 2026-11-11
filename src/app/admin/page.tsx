"use client";

import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-2">
          Dashboard
        </p>
        <h1 className="font-serif-display text-4xl font-light">Manage portfolio</h1>
        <p className="mt-3 text-ink-900/60 max-w-xl">
          Add project types and portfolio projects. Images upload to Cloudinary; the public
          site reads from Firestore.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/projects"
          className="border border-ink-900/10 p-6 hover:border-ink-900/30 transition-colors"
        >
          <h2 className="font-serif-display text-2xl">Projects</h2>
          <p className="mt-2 text-sm text-ink-900/55">
            Create and edit project details, images, and publish state.
          </p>
        </Link>
        <Link
          href="/admin/categories"
          className="border border-ink-900/10 p-6 hover:border-ink-900/30 transition-colors"
        >
          <h2 className="font-serif-display text-2xl">Categories</h2>
          <p className="mt-2 text-sm text-ink-900/55">
            Manage Design Explorer project types (houses, guest house, compound).
          </p>
        </Link>
      </div>
    </div>
  );
}
