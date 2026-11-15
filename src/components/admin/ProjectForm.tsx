"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormActions } from "@/components/admin/AdminFormActions";
import {
  FormErrorBanner,
  FormField,
  clearFieldError,
  fieldInputClass,
  requiredMsg,
} from "@/components/admin/FormField";
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

type FieldKey =
  | "title"
  | "location"
  | "categoryId"
  | "summary"
  | "image";

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

const amInputCls = fieldInputClass(false, "amharic");

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
  error,
}: {
  title: string;
  children: React.ReactNode;
  amharicToggle?: React.ReactNode;
  error?: boolean;
}) {
  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden ${
        error ? "border-red-300 ring-1 ring-red-200" : "border-gray-200"
      }`}
    >
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {amharicToggle}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function BilingualField({
  label,
  hint,
  required,
  error,
  showAmharic,
  amLabel,
  children,
  amharicInput,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  showAmharic: boolean;
  amLabel: string;
  children: React.ReactNode;
  amharicInput: React.ReactNode;
}) {
  return (
    <div className={showAmharic ? "space-y-2" : undefined}>
      <FormField label={label} hint={hint} required={required} error={error}>
        {children}
      </FormField>
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
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>(
    {},
  );
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

  // When Next.js serves this page from its router cache, state is frozen at the
  // last-visited values. Reset everything to blank whenever we're in create mode.
  useEffect(() => {
    if (mode === "create") {
      setForm(blankProject());
      setFile(null);
      setPreview(null);
      setError("");
      setFieldErrors({});
      setShowAmharic(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const setField = <K extends keyof Project>(key: K, value: Project[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "title" || key === "location" || key === "summary" || key === "categoryId") {
      clearFieldError(setFieldErrors, key);
    }
  };

  const onCategoryChange = (categoryId: string) => {
    const category = categories.find((item) => item.id === categoryId);
    setForm((prev) => ({
      ...prev,
      categoryId,
      category: category?.label ?? prev.category,
    }));
    clearFieldError(setFieldErrors, "categoryId");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
      clearFieldError(setFieldErrors, "image");
    }
  };

  const validate = (): Partial<Record<FieldKey, string>> => {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!form.title.trim()) next.title = requiredMsg("Title");
    if (!form.location.trim()) next.location = requiredMsg("Location");
    if (!form.categoryId) next.categoryId = requiredMsg("Category");
    if (!form.summary.trim()) next.summary = requiredMsg("Short summary");
    if (!file && !form.image) next.image = requiredMsg("Cover image");
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const nextErrors = validate();
    setFieldErrors(nextErrors);
    const count = Object.keys(nextErrors).length;
    if (count > 0) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);

    try {
      const slug =
        mode === "edit" ? form.slug : slugify(form.slug || form.title);
      if (!slug) {
        setFieldErrors({ title: requiredMsg("Title") });
        setError("Please fill in all required fields.");
        return;
      }

      let image = form.image;
      let imagePublicId = form.imagePublicId;

      if (file) {
        const token = await getIdToken();
        if (!token) throw new Error("Not authenticated");
        const uploaded = await uploadProjectImage(file, token);
        image = uploaded.url;
        imagePublicId = uploaded.publicId;
      }

      if (!image) {
        setFieldErrors({ image: requiredMsg("Cover image") });
        setError("Please fill in all required fields.");
        return;
      }

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

  const fieldErrorCount = Object.keys(fieldErrors).length;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 pb-28">
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
          required
          error={fieldErrors.title}
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
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className={fieldInputClass(!!fieldErrors.title)}
            placeholder="e.g. Modern Villa in Dire"
            aria-invalid={!!fieldErrors.title}
          />
        </BilingualField>

        <BilingualField
          label="Location"
          required
          error={fieldErrors.location}
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
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
            className={fieldInputClass(!!fieldErrors.location)}
            placeholder="Dire Dawa"
            aria-invalid={!!fieldErrors.location}
          />
        </BilingualField>

        <FormField
          label="Category"
          required
          error={fieldErrors.categoryId}
        >
          <select
            value={form.categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={fieldInputClass(!!fieldErrors.categoryId)}
            aria-invalid={!!fieldErrors.categoryId}
          >
            <option value="">Select a category…</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Year">
            <input
              value={form.year}
              onChange={(e) => setField("year", e.target.value)}
              className={fieldInputClass()}
              placeholder="2024"
            />
          </FormField>
          <FormField label="Area" hint="Optional">
            <input
              value={form.area}
              onChange={(e) => setField("area", e.target.value)}
              className={fieldInputClass()}
              placeholder="320 m²"
            />
          </FormField>
        </div>

        <BilingualField
          label="Short summary"
          hint="One line under the title on the project page"
          required
          error={fieldErrors.summary}
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
            rows={2}
            value={form.summary}
            onChange={(e) => setField("summary", e.target.value)}
            className={fieldInputClass(!!fieldErrors.summary)}
            placeholder="A G+2 private house with clean finishes and a shaded yard."
            aria-invalid={!!fieldErrors.summary}
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
            className={fieldInputClass()}
            placeholder="Optional details about the build…"
          />
        </BilingualField>
      </SectionCard>

      <SectionCard title="Cover image" error={!!fieldErrors.image}>
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
            <div
              className={`aspect-[16/10] rounded-xl bg-gray-100 border-2 border-dashed flex items-center justify-center text-sm ${
                fieldErrors.image
                  ? "border-red-400 text-red-500 bg-red-50"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              No image yet
            </div>
          )}
        </div>

        <FormField
          label={form.image ? "Replace image" : "Upload image"}
          required={!form.image}
          error={fieldErrors.image}
        >
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700"
            aria-invalid={!!fieldErrors.image}
          />
        </FormField>
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

      <FormErrorBanner message={error} fieldCount={fieldErrorCount} />

      <AdminFormActions
        saving={saving}
        submitLabel={mode === "edit" ? "Update project" : "Create project"}
        onCancel={() => router.push("/admin/projects")}
        aboveTabBar={false}
      />
    </form>
  );
}
