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

  const onDelete = async (slug: string) => {
    if (!confirm(`Delete project “${slug}”?`)) return;
    await deleteProjectClient(slug);
    await load();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-2">
            Projects
          </p>
          <h1 className="font-serif-display text-4xl font-light">Portfolio</h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-ink-900 text-bone-50 px-5 py-2.5 text-[12px] tracking-widest-2 uppercase"
        >
          Add project
        </Link>
      </div>

      {error ? <p className="text-sm text-terracotta-500">{error}</p> : null}

      <div className="border border-ink-900/10 divide-y divide-ink-900/10">
        {loading ? (
          <p className="p-6 text-sm text-ink-900/50">Loading…</p>
        ) : projects.length === 0 ? (
          <p className="p-6 text-sm text-ink-900/50">No projects yet. Seed or add one.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.slug}
              className="p-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt=""
                  className="w-16 h-12 object-cover rounded bg-bone-200"
                />
                <div className="min-w-0">
                  <div className="font-serif-display text-xl truncate">
                    {project.title}
                  </div>
                  <div className="text-xs text-ink-900/45 mt-1">
                    /{project.index} · {project.location} · {project.category} ·{" "}
                    {project.published ? "published" : "draft"}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/projects/${project.slug}/edit`}
                  className="text-[12px] tracking-widest-2 uppercase text-ink-900/60 hover:text-ink-900"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(project.slug)}
                  className="text-[12px] tracking-widest-2 uppercase text-terracotta-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
