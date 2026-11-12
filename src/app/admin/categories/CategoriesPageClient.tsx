"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  deleteCategoryClient,
  listCategoriesClient,
  saveCategoryClient,
  slugify,
} from "@/lib/admin/firestore";
import type { ProjectCategory } from "@/lib/types";

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 bg-gray-50";

const emptyForm = () => ({ label: "", description: "" });

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const sorted = [...categories].sort((a, b) => a.order - b.order);

  const load = async () => {
    setLoading(true);
    try {
      setCategories(await listCategoriesClient());
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (category: ProjectCategory) => {
    setEditingId(category.id);
    setForm({ label: category.label, description: category.description });
    setError("");
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError("");
    setFormOpen(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        const existing = categories.find((c) => c.id === editingId);
        if (!existing) throw new Error("Category not found");
        await saveCategoryClient({ ...existing, ...form });
      } else {
        const id = slugify(form.label);
        if (!id) throw new Error("Label is required");
        if (categories.some((c) => c.id === id)) {
          throw new Error(`A category with id "${id}" already exists`);
        }
        const maxOrder = categories.reduce((m, c) => Math.max(m, c.order), 0);
        await saveCategoryClient({
          id,
          label: form.label,
          description: form.description,
          order: maxOrder + 1,
        });
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
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
        saveCategoryClient({ ...a, order: b.order }),
        saveCategoryClient({ ...b, order: a.order }),
      ]);
      await load();
    } finally {
      setReordering(false);
    }
  };

  const onDelete_ = async (id: string, label: string) => {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    await deleteCategoryClient(id);
    if (editingId === id) resetForm();
    const remaining = sorted.filter((c) => c.id !== id);
    await Promise.all(
      remaining.map((c, i) =>
        c.order !== i + 1 ? saveCategoryClient({ ...c, order: i + 1 }) : Promise.resolve(),
      ),
    );
    await load();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Project types on the public portfolio.
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
              {editingId ? `Edit: ${form.label}` : "New category"}
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
                Label
              </label>
              <input
                required
                value={form.label}
                onChange={(e) => setForm((prev) => ({ ...prev, label: e.target.value }))}
                className={inputCls}
                placeholder="Residences"
              />
              {!editingId && form.label ? (
                <p className="mt-1.5 text-xs text-gray-400">
                  ID:{" "}
                  <span className="font-mono text-gray-600">{slugify(form.label)}</span>
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className={inputCls}
                placeholder="Residential projects including houses and villas"
              />
            </div>

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
                "Update category"
              ) : (
                "Create category"
              )}
            </button>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            All categories
            {!loading && (
              <span className="ml-2 text-xs font-normal text-gray-400">
                ({categories.length})
              </span>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-gray-400">Loading…</div>
        ) : categories.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-gray-500">
            No categories yet. Add one above.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {sorted.map((category, index) => (
              <li
                key={category.id}
                className={`flex items-center gap-3 px-4 py-4 transition-colors ${
                  editingId === category.id ? "bg-blue-50" : ""
                }`}
              >
                {/* Reorder buttons */}
                <div className="flex flex-col gap-1 shrink-0">
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

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">
                      {category.label}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                      {category.id}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(category)}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete_(category.id, category.label)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
