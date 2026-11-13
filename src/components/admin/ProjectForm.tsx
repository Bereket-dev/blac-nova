"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormActions } from "@/components/admin/AdminFormActions";
import { useAdminAuth } from "@/lib/admin/auth";
import {
  listCategoriesClient,
  listProjectsClient,
  saveProjectClient,
  slugify,
} from "@/lib/admin/firestore";
import { revalidateProjects } from "@/lib/admin/actions";
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
  index: "",
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
  isOngoing: false,
  order: 0,
  published: true,
  title_am: "",
  location_am: "",
  summary_am: "",
  description_am: "",
  approach_am: "",
  status_am: "",
});

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 bg-gray-50";

const amInputCls =
  "w-full border border-amber-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-amber-50/40";

function AmharicToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
    >
      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          enabled ? "bg-amber-400" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-4" : "translate-x-1"
          }`}
        />
      </span>
      አማርኛ
    </button>
  );
}

function SectionCard({
  title,
  children,
  amharicToggle,
}: {
  title: string;
  children: React.ReactNode;
  amharicToggle?: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {amharicToggle}
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

function BilingualField({
  label,
  hint,
  showAmharic,
  amLabel,
  children,
  amharicInput,
}: {
  label: string;
  hint?: string;
  showAmharic: boolean;
  amLabel: string;
  children: React.ReactNode;
  amharicInput: React.ReactNode;
}) {
  return (
    <div className={showAmharic ? "space-y-2" : undefined}>
      <Field label={label} hint={hint}>
        {children}
      </Field>
      {showAmharic && (
        <div className="pl-3 border-l-2 border-amber-300">
          <label className="block">
            <span className="block text-xs font-semibold text-amber-700 mb-1.5">
              {amLabel}
            </span>
            {amharicInput}
          </label>
        </div>
      )}
    </div>
  );
}

export function ProjectForm({ initial, mode }: ProjectFormProps) {
  const router = useRouter();
  const { getIdToken } = useAdminAuth();
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [form, setForm] = useState<Project>(initial ?? blankProject());
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showAmharic, setShowAmharic] = useState(() => {
    const p = initial;
    return !!(
      p?.title_am ||
      p?.location_am ||
      p?.summary_am ||
      p?.description_am
    );
  });

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
      if (!slug) throw new Error("Title is required");
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
      const description = form.description.trim();
      const summary = form.summary.trim() || description;

      let index = form.index;
      let order: number = form.order ?? 0;
      if (mode === "create") {
        const existing = await listProjectsClient();
        order = existing.reduce((max, p) => Math.max(max, p.order ?? 0), 0) + 1;
        index = String(order).padStart(2, "0");
      } else if (!index) {
        index = String(order || 1).padStart(2, "0");
      }

      const payload: Project = {
        ...form,
        slug,
        category: category?.label || form.category,
        image,
        imagePublicId,
        alt: form.alt || form.title,
        summary,
        description: description || summary,
        // Preserve existing extras on edit; keep empty on create
        approach: form.approach,
        scope: form.scope ?? [],
        materials: form.materials ?? [],
        details: form.details ?? [],
        collaborator: form.collaborator || "Blac Nova",
        index,
        order,
        status: form.isOngoing
          ? form.status || "Ongoing"
          : form.status || (form.year ? `Completed ${form.year}` : "Completed"),
        status_am: form.isOngoing
          ? form.status_am || "በሂደት ላይ"
          : form.status_am || "",
      };

      await saveProjectClient(payload);
      await revalidateProjects(slug);
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 pb-28">
      <SectionCard
        title="Project"
        amharicToggle={
          <AmharicToggle
            enabled={showAmharic}
            onToggle={() => setShowAmharic((v) => !v)}
          />
        }
      >
        <BilingualField
          label="Title"
          showAmharic={showAmharic}
          amLabel="Title — አማርኛ"
          amharicInput={
            <input
              value={form.title_am ?? ""}
              onChange={(e) => setField("title_am", e.target.value)}
              className={amInputCls}
              placeholder="ፕሮጀክቱ ስም"
              lang="am"
            />
          }
        >
          <input
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className={inputCls}
            placeholder="e.g. Modern Villa in Addis"
          />
        </BilingualField>

        <BilingualField
          label="Location"
          showAmharic={showAmharic}
          amLabel="Location — አማርኛ"
          amharicInput={
            <input
              value={form.location_am ?? ""}
              onChange={(e) => setField("location_am", e.target.value)}
              className={amInputCls}
              placeholder="አዲስ አበባ"
              lang="am"
            />
          }
        >
          <input
            required
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
            className={inputCls}
            placeholder="Addis Ababa"
          />
        </BilingualField>

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

        <div className="grid grid-cols-2 gap-4">
          <Field label="Year">
            <input
              value={form.year}
              onChange={(e) => setField("year", e.target.value)}
              className={inputCls}
              placeholder="2024"
            />
          </Field>
          <Field label="Area" hint="Optional">
            <input
              value={form.area}
              onChange={(e) => setField("area", e.target.value)}
              className={inputCls}
              placeholder="320 m²"
            />
          </Field>
        </div>

        <BilingualField
          label="Short summary"
          hint="One line under the title on the project page"
          showAmharic={showAmharic}
          amLabel="Summary — አማርኛ"
          amharicInput={
            <textarea
              rows={2}
              value={form.summary_am ?? ""}
              onChange={(e) => setField("summary_am", e.target.value)}
              className={amInputCls}
              lang="am"
            />
          }
        >
          <textarea
            required
            rows={2}
            value={form.summary}
            onChange={(e) => setField("summary", e.target.value)}
            className={inputCls}
            placeholder="A G+2 private house with clean finishes and a shaded yard."
          />
        </BilingualField>

        <BilingualField
          label="About"
          hint="Optional longer description — leave blank to reuse the summary"
          showAmharic={showAmharic}
          amLabel="About — አማርኛ"
          amharicInput={
            <textarea
              rows={4}
              value={form.description_am ?? ""}
              onChange={(e) => setField("description_am", e.target.value)}
              className={amInputCls}
              lang="am"
            />
          }
        >
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            className={inputCls}
            placeholder="Optional details about the build…"
          />
        </BilingualField>
      </SectionCard>

      <SectionCard title="Cover image">
        <div>
          <p className="text-xs text-gray-500 mb-2">
            Public preview — same 16:10 crop as the site
          </p>
          {(preview ?? form.image) ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview ?? form.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          ) : (
            <div className="aspect-[16/10] rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400">
              No image yet
            </div>
          )}
        </div>

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
      </SectionCard>

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

        <label className="flex items-center gap-4 py-2 cursor-pointer border-t border-gray-100">
          <input
            type="checkbox"
            checked={form.isOngoing ?? false}
            onChange={(e) => setField("isOngoing", e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 accent-amber-500 shrink-0"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">Ongoing project</p>
            <p className="text-xs text-gray-400">
              Shows an &quot;Ongoing&quot; badge instead of completed
            </p>
          </div>
        </label>
      </SectionCard>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      ) : null}

      <AdminFormActions
        saving={saving}
        submitLabel={mode === "edit" ? "Update project" : "Create project"}
        onCancel={() => router.push("/admin/projects")}
        aboveTabBar={false}
      />
    </form>
  );
}
