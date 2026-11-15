"use client";

import { useCallback, useEffect, useState } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import {
  deleteSubscriberClient,
  listSubscribersClient,
} from "@/lib/admin/firestore";
import type { Subscriber } from "@/lib/types";

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-ET", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Addis_Ababa",
  });
}

export default function SubscribersPageClient() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Subscriber | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setSubscribers(await listSubscribersClient());
    } catch {
      setError("Failed to load subscribers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteSubscriberClient(pendingDelete.id);
      setSubscribers((prev) => prev.filter((s) => s.id !== pendingDelete.id));
    } catch {
      setError("Failed to delete subscriber.");
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  };

  return (
    <div className="space-y-5">
      <ConfirmModal
        open={!!pendingDelete}
        title="Remove subscriber"
        message={`Remove "${pendingDelete?.email}" from the list? This cannot be undone.`}
        confirmLabel="Remove"
        loading={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDelete(null)}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Subscribers</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Emails collected from the footer sign-up form.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Refresh"
        >
          <i className="ri-refresh-line text-base" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      ) : null}

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            All subscribers
            {!loading && (
              <span className="ml-2 text-xs font-normal text-gray-400">
                ({subscribers.length})
              </span>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="divide-y divide-gray-100">
            {[0, 1, 2].map((i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-3 animate-pulse">
                <div className="flex-1 h-4 bg-gray-100 rounded" />
                <div className="w-28 h-4 bg-gray-100 rounded" />
                <div className="w-14 h-7 bg-gray-100 rounded-lg" />
              </div>
            ))}
          </div>
        ) : subscribers.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <i className="ri-mail-line text-3xl text-gray-200" />
            <p className="mt-3 text-sm text-gray-400">No subscribers yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {subscribers.map((sub) => (
              <li key={sub.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <i className="ri-mail-line text-sm text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{sub.email}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(sub.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`mailto:${sub.email}`}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Send email
                  </a>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(sub)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Remove
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
