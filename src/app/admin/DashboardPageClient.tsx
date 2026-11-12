"use client";

import Link from "next/link";

const sections = [
  {
    href: "/admin/projects",
    emoji: "🗂",
    title: "Projects",
    description: "Add, edit, and publish portfolio projects.",
    action: "Open projects",
    addHref: "/admin/projects/new",
    addLabel: "+ New project",
  },
  {
    href: "/admin/categories",
    emoji: "🏷",
    title: "Categories",
    description: "Manage project types (houses, compound, etc.)",
    action: "Open categories",
    addHref: null,
    addLabel: null,
  },
  {
    href: "/admin/testimonials",
    emoji: "💬",
    title: "Testimonials",
    description: "Client reviews shown on the homepage.",
    action: "Open reviews",
    addHref: null,
    addLabel: null,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Manage your portfolio content.
        </p>
      </div>

      {/* Primary CTA */}
      <Link
        href="/admin/projects/new"
        className="flex items-center justify-between gap-4 bg-gray-900 text-white rounded-2xl px-5 py-4 active:scale-[0.98] transition-transform"
      >
        <div>
          <p className="text-sm font-semibold">New project</p>
          <p className="text-xs text-gray-400 mt-0.5">Add a portfolio project</p>
        </div>
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-lg">
          ＋
        </div>
      </Link>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 active:scale-[0.98] transition-transform hover:border-gray-400"
          >
            <div className="text-2xl">{s.emoji}</div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900">{s.title}</h2>
              <p className="mt-1 text-sm text-gray-500 leading-snug">{s.description}</p>
            </div>
            <span className="text-xs font-medium text-gray-400 group-hover:text-gray-700 transition-colors">
              {s.action} →
            </span>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Quick links
        </h2>
        <div className="flex flex-col gap-2">
          <Link
            href="/admin/projects/new"
            className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-900">+ New project</span>
            <span className="text-gray-400 text-sm">→</span>
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-900">+ New category</span>
            <span className="text-gray-400 text-sm">→</span>
          </Link>
          <Link
            href="/admin/testimonials"
            className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-900">+ New testimonial</span>
            <span className="text-gray-400 text-sm">→</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-900">View public site</span>
            <span className="text-gray-400 text-sm">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
