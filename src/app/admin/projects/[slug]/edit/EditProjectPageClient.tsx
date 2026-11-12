"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectClient } from "@/lib/admin/firestore";
import type { Project } from "@/lib/types";

export default function EditProjectPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    void getProjectClient(slug)
      .then((item) => {
        if (!item) setError("Project not found");
        setProject(item);
      })
      .catch(() => setError("Failed to load project"))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/projects"
          className="text-[12px] tracking-widest-2 uppercase text-ink-900/50 hover:text-ink-900"
        >
          ← Projects
        </Link>
        <h1 className="mt-4 font-serif-display text-4xl font-light">Edit project</h1>
      </div>

      {loading ? <p className="text-sm text-ink-900/50">Loading…</p> : null}
      {error ? <p className="text-sm text-terracotta-500">{error}</p> : null}
      {project ? <ProjectForm mode="edit" initial={project} /> : null}
    </div>
  );
}
