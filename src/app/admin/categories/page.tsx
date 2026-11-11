"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  deleteCategoryClient,
  listCategoriesClient,
  saveCategoryClient,
  slugify,
} from "@/lib/admin/firestore";
import type { ProjectCategory } from "@/lib/types";

const emptyForm = (): ProjectCategory => ({
  id: "",
  label: "",
  description: "",
  order: 1,
});

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [form, setForm] = useState<ProjectCategory>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setCategories(await listCategoriesClient());
    } catch {
      setError("Failed to load categories. Check Firestore rules and config.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (category: ProjectCategory) => {
    setEditingId(category.id);
    setForm({ ...category });
    setError("");
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const id = editingId ?? slugify(form.id || form.label);
      if (!id) throw new Error("Category id is required");
      const payload: ProjectCategory = {
        ...form,
        id,
        order: Number(form.order) || 0,
      };
      await saveCategoryClient(payload);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm(`Delete category “${id}”?`)) return;
    await deleteCategoryClient(id);
    if (editingId === id) resetForm();
    await load();
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-2">
          Categories
        </p>
        <h1 className="font-serif-display text-4xl font-light">Project types</h1>
      </div>

      <form onSubmit={onSubmit} className="border border-ink-900/10 p-6 space-y-4">
        <h2 className="font-serif-display text-2xl">
          {editingId ? "Edit category" : "Add category"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
              ID
            </span>
            <input
              required
              disabled={Boolean(editingId)}
              value={form.id}
              onChange={(e) => setForm((prev) => ({ ...prev, id: e.target.value }))}
              className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm disabled:bg-bone-100"
              placeholder="residences"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
              Order
            </span>
            <input
              required
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, order: Number(e.target.value) }))
              }
              className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
              Label
            </span>
            <input
              required
              value={form.label}
              onChange={(e) => setForm((prev) => ({ ...prev, label: e.target.value }))}
              className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
              Description
            </span>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className="mt-2 w-full border border-ink-900/10 px-3 py-2 text-sm"
            />
          </label>
        </div>
        {error ? <p className="text-sm text-terracotta-500">{error}</p> : null}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-ink-900 text-bone-50 px-5 py-2.5 text-[12px] tracking-widest-2 uppercase disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Update" : "Create"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-ink-900/15 px-5 py-2.5 text-[12px] tracking-widest-2 uppercase"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="border border-ink-900/10 divide-y divide-ink-900/10">
        {loading ? (
          <p className="p-6 text-sm text-ink-900/50">Loading…</p>
        ) : categories.length === 0 ? (
          <p className="p-6 text-sm text-ink-900/50">No categories yet.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="p-4 flex flex-wrap items-start justify-between gap-4"
            >
              <div>
                <div className="font-serif-display text-xl">{category.label}</div>
                <div className="text-xs text-ink-900/45 mt-1">
                  {category.id} · order {category.order}
                </div>
                <p className="mt-2 text-sm text-ink-900/60 max-w-2xl">
                  {category.description}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(category)}
                  className="text-[12px] tracking-widest-2 uppercase text-ink-900/60 hover:text-ink-900"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(category.id)}
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
