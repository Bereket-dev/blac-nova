"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteProjectClient, listProjectsClient } from "@/lib/admin/firestore";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setProjects(await listProjectsClient());
      setError("");
    } catch {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteProjectClient(slug);
    await load();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          {!loading && (
            <p className="mt-0.5 text-sm text-gray-500">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl active:scale-[0.97] transition-transform hover:bg-gray-700"
        >
          <span className="text-base leading-none">+</span>
          Add project
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      ) : null}

      {/* Mobile card list */}
      <div className="md:hidden">
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-12 text-center text-sm text-gray-400">
            Loading…
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-12 text-center space-y-3">
            <p className="text-sm text-gray-500">No projects yet.</p>
            <Link
              href="/admin/projects/new"
              className="inline-block text-sm font-medium text-gray-900 underline underline-offset-2"
            >
              Add your first project
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                {/* Image + title row */}
                <div className="flex items-center gap-3 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt=""
                    className="w-16 h-12 object-cover rounded-xl bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm leading-tight truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {[project.category, project.location, project.year]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  {project.published ? (
                    <span className="shrink-0 inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Live
                    </span>
                  ) : (
                    <span className="shrink-0 inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full border border-gray-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      Draft
                    </span>
                  )}
                </div>
                {/* Action row */}
                <div className="flex border-t border-gray-100 divide-x divide-gray-100">
                  <Link
                    href={`/admin/projects/${project.slug}/edit`}
                    className="flex-1 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(project.slug, project.title)}
                    className="flex-1 py-3 text-center text-sm font-medium text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-gray-400">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="px-6 py-12 text-center space-y-3">
            <p className="text-sm text-gray-500">No projects yet.</p>
            <Link
              href="/admin/projects/new"
              className="inline-block text-sm font-medium text-gray-900 underline underline-offset-2"
            >
              Add your first project
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Project
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Location
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Year
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.slug} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt=""
                        className="w-12 h-9 object-cover rounded-lg bg-gray-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate max-w-[200px]">
                          {project.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          /{project.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                      {project.category || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{project.location || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{project.year || "—"}</td>
                  <td className="px-4 py-3">
                    {project.published ? (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full border border-gray-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/projects/${project.slug}/edit`}
                        className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(project.slug, project.title)}
                        className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
