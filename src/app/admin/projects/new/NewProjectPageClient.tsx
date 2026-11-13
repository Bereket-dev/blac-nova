"use client";

import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/projects"
          className="text-[12px] tracking-widest-2 uppercase text-ink-900/50 hover:text-ink-900"
        >
          ← Projects
        </Link>
        <h1 className="mt-4 font-serif-display text-4xl font-light">New project</h1>
      </div>
      <ProjectForm mode="create" />
    </div>
  );
}
