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

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 bg-gray-50";

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block">
        <span className="block text-xs font-semibold text-gray-700 mb-2">{label}</span>
        {hint ? (
          <span className="block text-xs text-gray-400 mb-2">{hint}</span>
        ) : null}
        {children}
      </label>
    </div>
  );
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
  const [preview, setPreview] = useState<string | null>(null);
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
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
    /* Extra bottom padding so the sticky bar doesn't cover the last section */
    <form onSubmit={onSubmit} className="space-y-4 pb-28">

      {/* ── Basic info ─────────────────────────────────────────────── */}
      <SectionCard title="Basic info">
        <Field label="Title">
          <input
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className={inputCls}
            placeholder="e.g. Modern Villa in Addis"
          />
        </Field>

        <Field
          label="Slug"
          hint={mode === "create" ? "Auto-generated from title if left empty" : undefined}
        >
          <input
            required={mode === "create"}
            disabled={mode === "edit"}
            value={form.slug}
            onChange={(e) => setField("slug", e.target.value)}
            className={inputCls}
            placeholder="modern-villa-addis"
          />
        </Field>

        <Field label="Category">
          <select
            required
            value={form.categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={inputCls}
          >
            <option value="">Select a category…</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Badge label" hint="Leave blank to use the category label">
          <input
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            className={inputCls}
            placeholder="Defaults to category"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Location">
            <input
              required
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              className={inputCls}
              placeholder="Addis Ababa"
            />
          </Field>

          <Field label="Year">
            <input
              value={form.year}
              onChange={(e) => setField("year", e.target.value)}
              className={inputCls}
              placeholder="2024"
            />
          </Field>

          <Field label="Status">
            <input
              value={form.status}
              onChange={(e) => setField("status", e.target.value)}
              className={inputCls}
              placeholder="Completed 2025"
            />
          </Field>

          <Field label="Area">
            <input
              value={form.area}
              onChange={(e) => setField("area", e.target.value)}
              className={inputCls}
              placeholder="320 m²"
            />
          </Field>

          <Field label="Index" hint="Display number">
            <input
              required
              value={form.index}
              onChange={(e) => setField("index", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Sort order" hint="Lower = shown first">
            <input
              type="number"
              value={form.order}
              onChange={(e) => setField("order", Number(e.target.value))}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Collaborator">
          <input
            value={form.collaborator}
            onChange={(e) => setField("collaborator", e.target.value)}
            className={inputCls}
          />
        </Field>
      </SectionCard>

      {/* ── Cover image ─────────────────────────────────────────────── */}
      <SectionCard title="Cover image">
        {(preview ?? form.image) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview ?? form.image}
            alt=""
            className="w-full max-h-48 object-cover rounded-xl bg-gray-100 border border-gray-200"
          />
        ) : (
          <div className="w-full h-36 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400">
            No image yet
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            {form.image ? "Replace image" : "Upload image"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700"
          />
        </div>

        <Field label="Image alt text" hint="Describes the image for accessibility">
          <input
            value={form.alt}
            onChange={(e) => setField("alt", e.target.value)}
            className={inputCls}
            placeholder="Exterior view of the villa"
          />
        </Field>
      </SectionCard>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <SectionCard title="Content">
        <Field label="Summary" hint="Short one-liner shown on project cards">
          <textarea
            required
            rows={2}
            value={form.summary}
            onChange={(e) => setField("summary", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Description" hint="Main project description paragraph">
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Approach" hint="Design approach or concept notes">
          <textarea
            rows={3}
            value={form.approach}
            onChange={(e) => setField("approach", e.target.value)}
            className={inputCls}
          />
        </Field>
      </SectionCard>

      {/* ── Lists ───────────────────────────────────────────────────── */}
      <SectionCard title="Lists">
        <p className="text-xs text-gray-400 -mt-1">One item per line.</p>

        <Field label="Scope of work">
          <textarea
            rows={5}
            value={scopeText}
            onChange={(e) => setScopeText(e.target.value)}
            className={inputCls}
            placeholder={"Architecture\nInterior design\nLandscaping"}
          />
        </Field>

        <Field label="Materials">
          <textarea
            rows={5}
            value={materialsText}
            onChange={(e) => setMaterialsText(e.target.value)}
            className={inputCls}
            placeholder={"Reinforced concrete\nTimber cladding\nStone"}
          />
        </Field>

        <Field label="Design details">
          <textarea
            rows={5}
            value={detailsText}
            onChange={(e) => setDetailsText(e.target.value)}
            className={inputCls}
            placeholder={"Double-height living space\nNatural ventilation\nSolar panels"}
          />
        </Field>
      </SectionCard>

      {/* ── Visibility ──────────────────────────────────────────────── */}
      <SectionCard title="Visibility">
        <label className="flex items-center gap-4 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setField("published", e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 accent-gray-900 shrink-0"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">Published</p>
            <p className="text-xs text-gray-400">
              Show this project on the public site
            </p>
          </div>
        </label>
      </SectionCard>

      {/* Error banner */}
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      ) : null}

      {/* ── Sticky save bar ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-20 bg-white/90 backdrop-blur border-t border-gray-200 safe-bottom md:static md:bg-transparent md:backdrop-blur-none md:border-0 md:p-0">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 md:px-0">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 md:flex-none md:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold py-3.5 md:py-2.5 px-6 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 active:scale-[0.98]"
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Saving…
              </>
            ) : mode === "edit" ? (
              "Update project"
            ) : (
              "Create project"
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="flex-1 md:flex-none md:w-auto py-3.5 md:py-2.5 px-6 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
