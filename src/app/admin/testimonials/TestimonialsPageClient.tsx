"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  deleteTestimonialClient,
  listTestimonialsClient,
  saveTestimonialClient,
  slugify,
} from "@/lib/admin/firestore";
import { uploadProjectImage } from "@/lib/admin/upload";
import { useAdminAuth } from "@/lib/admin/auth";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import type { Testimonial } from "@/lib/types";

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 bg-gray-50";

const emptyForm = () => ({
  quote: "",
  name: "",
  role: "",
  avatar: "",
  sex: "male" as Testimonial["sex"],
  featured: false,
});

export default function AdminTestimonialsPage() {
  const { getIdToken } = useAdminAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(emptyForm());
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const sorted = [...testimonials].sort((a, b) => a.order - b.order);

  const load = async () => {
    setLoading(true);
    try {
      setTestimonials(await listTestimonialsClient());
    } catch {
      setError("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({ quote: t.quote, name: t.name, role: t.role, avatar: t.avatar, sex: t.sex, featured: t.featured });
    setAvatarFile(null);
    setAvatarPreview(null);
    setError("");
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
    setAvatarFile(null);
    setAvatarPreview(null);
    setError("");
    setFormOpen(false);
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setAvatarFile(f);
    if (f) setAvatarPreview(URL.createObjectURL(f));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let avatar = form.avatar;

      // Upload new avatar if one was selected
      if (avatarFile) {
        const token = await getIdToken();
        if (!token) throw new Error("Not authenticated");
        const uploaded = await uploadProjectImage(avatarFile, token);
        avatar = uploaded.url;
      }

      if (editingId) {
        const existing = testimonials.find((t) => t.id === editingId);
        if (!existing) throw new Error("Testimonial not found");
        if (form.featured && !existing.featured) {
          await Promise.all(
            testimonials
              .filter((t) => t.featured && t.id !== editingId)
              .map((t) => saveTestimonialClient({ ...t, featured: false })),
          );
        }
        await saveTestimonialClient({ ...existing, ...form, avatar });
      } else {
        const id = slugify(form.name);
        if (!id) throw new Error("Name is required");
        if (testimonials.some((t) => t.id === id)) {
          throw new Error(`A testimonial with id "${id}" already exists`);
        }
        const maxOrder = testimonials.reduce((m, t) => Math.max(m, t.order), 0);
        if (form.featured) {
          await Promise.all(
            testimonials
              .filter((t) => t.featured)
              .map((t) => saveTestimonialClient({ ...t, featured: false })),
          );
        }
        await saveTestimonialClient({ id, ...form, avatar, order: maxOrder + 1 });
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"? This cannot be undone.`)) return;
    await deleteTestimonialClient(id);
    if (editingId === id) resetForm();
    const remaining = sorted.filter((t) => t.id !== id);
    await Promise.all(
      remaining.map((t, i) =>
        t.order !== i + 1 ? saveTestimonialClient({ ...t, order: i + 1 }) : Promise.resolve(),
      ),
    );
    await load();
  };

  const move = async (index: number, direction: "up" | "down") => {
    const list = sorted;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= list.length) return;
    setReordering(true);
    try {
      const a = list[index];
      const b = list[swapIndex];
      await Promise.all([
        saveTestimonialClient({ ...a, order: b.order }),
        saveTestimonialClient({ ...b, order: a.order }),
      ]);
      await load();
    } finally {
      setReordering(false);
    }
  };

  // The currently visible avatar: file preview > existing url
  const currentAvatar = avatarPreview ?? form.avatar;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Testimonials</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Client reviews shown on the homepage.
          </p>
        </div>
        {!formOpen && (
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl active:scale-[0.97] transition-transform hover:bg-gray-700"
          >
            <span className="text-base leading-none">+</span>
            Add
          </button>
        )}
      </div>

      {/* Form */}
      {formOpen && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              {editingId ? `Edit: ${form.name}` : "New testimonial"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Client name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className={inputCls}
                placeholder="Abebe Tadesse"
              />
              {!editingId && form.name ? (
                <p className="mt-1.5 text-xs text-gray-400">
                  ID: <span className="font-mono text-gray-600">{slugify(form.name)}</span>
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Role / location
              </label>
              <input
                required
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                className={inputCls}
                placeholder="Private Client, Dire Dawa"
              />
            </div>

            {/* Sex */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Gender</p>
              <div className="flex gap-2">
                {(["male", "female"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, sex: option }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                      form.sex === option
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {option === "male" ? "Male" : "Female"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Quote
              </label>
              <textarea
                required
                rows={4}
                value={form.quote}
                onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
                className={inputCls}
                placeholder="What the client said…"
              />
            </div>

            {/* Avatar upload */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Avatar photo{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <div className="flex items-center gap-4">
                {/* Preview circle — shows file preview, existing photo, or sex fallback */}
                <TestimonialAvatar
                  testimonial={{ name: form.name || "?", avatar: avatarPreview ?? form.avatar, sex: form.sex }}
                  size={56}
                />
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onAvatarChange}
                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700"
                  />
                  {currentAvatar && (
                    <button
                      type="button"
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarPreview(null);
                        setForm((p) => ({ ...p, avatar: "" }));
                      }}
                      className="mt-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Featured toggle */}
            <label className="flex items-center gap-4 py-3 px-4 bg-amber-50 border border-amber-100 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 accent-gray-900"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Featured</p>
                <p className="text-xs text-gray-500">
                  Show as the large hero quote — only one can be featured
                </p>
              </div>
            </label>

            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 active:scale-[0.98]"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Saving…
                </>
              ) : editingId ? (
                "Update testimonial"
              ) : (
                "Create testimonial"
              )}
            </button>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            All testimonials
            {!loading && (
              <span className="ml-2 text-xs font-normal text-gray-400">
                ({testimonials.length})
              </span>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-gray-400">Loading…</div>
        ) : testimonials.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-gray-500">
            No testimonials yet. Add one above.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {sorted.map((t, index) => (
              <li
                key={t.id}
                className={`flex items-start gap-3 px-4 py-4 transition-colors ${
                  editingId === t.id ? "bg-blue-50" : ""
                }`}
              >
                {/* Reorder */}
                <div className="flex flex-col gap-1 shrink-0 mt-0.5">
                  <button
                    type="button"
                    disabled={index === 0 || reordering}
                    onClick={() => move(index, "up")}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs"
                    title="Move up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    disabled={index === sorted.length - 1 || reordering}
                    onClick={() => move(index, "down")}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs"
                    title="Move down"
                  >
                    ▼
                  </button>
                </div>

                {/* Avatar */}
                <TestimonialAvatar testimonial={t} size={44} className="mt-0.5" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-gray-900">{t.name}</span>
                    <span className="text-xs text-gray-400">{t.role}</span>
                    {t.featured && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed line-clamp-2">
                    "{t.quote}"
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => startEdit(t)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(t.id, t.name)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
