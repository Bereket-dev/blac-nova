"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/admin/auth";
import {
  listCategoriesClient,
  saveProjectClient,
  slugify,
} from "@/lib/admin/firestore";
import { uploadProjectImage } from "@/lib/admin/upload";
import type { Project, ProjectCategory } from "@/lib/types";

type ProjectFormProps = {
  initial?: Project;
  mode: "create" | "edit";
};

const blankProject = (): Project => ({
  slug: "",
  title: "",
  location: "",
  category: "",
  categoryId: "",
  index: "01",
  collaborator: "Blac Nova",
  area: "",
  year: String(new Date().getFullYear()),
  image: "",
  alt: "",
  summary: "",
  description: "",
  approach: "",
  scope: [],
  materials: [],
  details: [],
  status: "",
  order: 1,
  published: true,
});

function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function listToLines(value: string[]): string {
  return value.join("\n");
}

export function ProjectForm({ initial, mode }: ProjectFormProps) {
  const router = useRouter();
  const { getIdToken } = useAdminAuth();
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [form, setForm] = useState<Project>(initial ?? blankProject());
  const [scopeText, setScopeText] = useState(listToLines(initial?.scope ?? []));
  const [materialsText, setMaterialsText] = useState(
    listToLines(initial?.materials ?? []),
  );
  const [detailsText, setDetailsText] = useState(listToLines(initial?.details ?? []));
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void listCategoriesClient()
      .then(setCategories)
      .catch(() => setError("Failed to load categories"));
  }, []);

  const setField = <K extends keyof Project>(key: K, value: Project[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onCategoryChange = (categoryId: string) => {
    const category = categories.find((item) => item.id === categoryId);
    setForm((prev) => ({
      ...prev,
      categoryId,
      category: category?.label ?? prev.category,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const slug =
        mode === "edit" ? form.slug : slugify(form.slug || form.title);
      if (!slug) throw new Error("Slug is required");
      if (!form.categoryId) throw new Error("Category is required");

      let image = form.image;
      let imagePublicId = form.imagePublicId;

      if (file) {
        const token = await getIdToken();
        if (!token) throw new Error("Not authenticated");
        const uploaded = await uploadProjectImage(file, token);
        image = uploaded.url;
        imagePublicId = uploaded.publicId;
      }

      if (!image) throw new Error("Project image is required");

      const category = categories.find((item) => item.id === form.categoryId);
      const payload: Project = {
        ...form,
        slug,
        category: category?.label || form.category,
        image,
        imagePublicId,
        scope: linesToList(scopeText),
        materials: linesToList(materialsText),
        details: linesToList(detailsText),
        order: Number(form.order) || 0,
        alt: form.alt || form.title,
      };

      await saveProjectClient(payload);
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block sm:col-span-2">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Title
          </span>
          <input
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Slug
          </span>
          <input
            required={mode === "create"}
            disabled={mode === "edit"}
            value={form.slug}
            onChange={(e) => setField("slug", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm disabled:bg-bone-100"
            placeholder="auto from title if empty"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Category
          </span>
          <select
            required
            value={form.categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm bg-bone-50"
          >
            <option value="">Select…</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Badge label (optional override)
          </span>
          <input
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
            placeholder="Defaults to category label"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Location
          </span>
          <input
            required
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Index
          </span>
          <input
            required
            value={form.index}
            onChange={(e) => setField("index", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Collaborator
          </span>
          <input
            value={form.collaborator}
            onChange={(e) => setField("collaborator", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Area
          </span>
          <input
            value={form.area}
            onChange={(e) => setField("area", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Year
          </span>
          <input
            value={form.year}
            onChange={(e) => setField("year", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Order
          </span>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setField("order", Number(e.target.value))}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Status
          </span>
          <input
            value={form.status}
            onChange={(e) => setField("status", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
            placeholder="Completed 2025"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-2 w-full text-sm"
          />
          {form.image ? (
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.image}
                alt=""
                className="w-28 h-20 object-cover rounded bg-bone-200"
              />
              <span className="text-xs text-ink-900/45 break-all">{form.image}</span>
            </div>
          ) : null}
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Image alt
          </span>
          <input
            value={form.alt}
            onChange={(e) => setField("alt", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Summary
          </span>
          <textarea
            required
            rows={2}
            value={form.summary}
            onChange={(e) => setField("summary", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Description
          </span>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Approach
          </span>
          <textarea
            rows={3}
            value={form.approach}
            onChange={(e) => setField("approach", e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Scope (one per line)
          </span>
          <textarea
            rows={5}
            value={scopeText}
            onChange={(e) => setScopeText(e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Materials (one per line)
          </span>
          <textarea
            rows={5}
            value={materialsText}
            onChange={(e) => setMaterialsText(e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Design details (one per line)
          </span>
          <textarea
            rows={5}
            value={detailsText}
            onChange={(e) => setDetailsText(e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex items-center gap-3 sm:col-span-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setField("published", e.target.checked)}
          />
          <span className="text-sm">Published on public site</span>
        </label>
      </div>

      {error ? <p className="text-sm text-terracotta-500">{error}</p> : null}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-ink-900 text-bone-50 px-6 py-3 text-[12px] tracking-widest-2 uppercase disabled:opacity-60"
      >
        {saving ? "Saving…" : mode === "edit" ? "Update project" : "Create project"}
      </button>
    </form>
  );
}
