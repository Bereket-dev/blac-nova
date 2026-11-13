"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getClientDb } from "@/lib/firebase/client";
import type { Inquiry } from "@/lib/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

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

function telegramLink(phone: string): string {
  // Strip non-digits, then try to build a t.me link
  const digits = phone.replace(/\D/g, "");
  return `https://t.me/+${digits}`;
}

function callLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

// ── Inquiry card ─────────────────────────────────────────────────────────────

function InquiryCard({
  inquiry,
  onHandled,
}: {
  inquiry: Inquiry;
  onHandled: (id: string) => void;
}) {
  const [marking, setMarking] = useState(false);

  const markHandled = async () => {
    setMarking(true);
    try {
      await updateDoc(doc(getClientDb(), "inquiries", inquiry.id), {
        handled: true,
        handledAt: Date.now(),
      });
      onHandled(inquiry.id);
    } catch {
      alert("Failed to mark as handled. Please try again.");
    } finally {
      setMarking(false);
    }
  };

  const handleCTAClick = async (action: "telegram" | "call") => {
    if (action === "telegram") {
      window.open(telegramLink(inquiry.phone), "_blank", "noopener");
    } else {
      window.location.href = callLink(inquiry.phone);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header row */}
      <div className="px-5 py-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{inquiry.name}</span>
            {!inquiry.handled && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-[10px] font-semibold tracking-wide text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                New
              </span>
            )}
          </div>
          <a
            href={callLink(inquiry.phone)}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors mt-0.5 block"
          >
            {inquiry.phone}
          </a>
        </div>
        <span className="text-[11px] text-gray-400 shrink-0 mt-1">
          {timeAgo(inquiry.createdAt)}
        </span>
      </div>

      {/* Design info (optional) */}
      {inquiry.designTitle ? (
        <div className="px-5 pb-3 -mt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700">
            <i className="ri-home-4-line text-gray-400 text-sm" />
            <span className="font-medium">{inquiry.designTitle}</span>
            {inquiry.designCategory ? (
              <span className="text-gray-400">· {inquiry.designCategory}</span>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Optional message */}
      {inquiry.message ? (
        <div className="px-5 pb-3">
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
            &ldquo;{inquiry.message}&rdquo;
          </p>
        </div>
      ) : null}

      {/* CTA buttons */}
      {!inquiry.handled ? (
        <div className="px-5 pb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleCTAClick("telegram")}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2AABEE] text-white text-sm font-medium hover:bg-[#229ED9] transition-colors"
          >
            <i className="ri-telegram-fill text-base" />
            Talk on Telegram
          </button>
          <button
            type="button"
            onClick={() => handleCTAClick("call")}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <i className="ri-phone-line text-base" />
            Call
          </button>
          <button
            type="button"
            onClick={markHandled}
            disabled={marking}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            {marking ? (
              <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" />
            ) : (
              <i className="ri-check-line text-base" />
            )}
            Handled
          </button>
        </div>
      ) : (
        /* Handled state — still show contact buttons + handled info */
        <div className="px-5 pb-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <a
              href={telegramLink(inquiry.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2AABEE] text-white text-sm font-medium hover:bg-[#229ED9] transition-colors"
            >
              <i className="ri-telegram-fill text-base" />
              Talk on Telegram
            </a>
            <a
              href={callLink(inquiry.phone)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <i className="ri-phone-line text-base" />
              Call
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1 text-green-600 font-medium">
              <i className="ri-check-double-line" /> Handled
            </span>
            {inquiry.handledAt ? <span>· {formatDate(inquiry.handledAt)}</span> : null}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function InquiriesPageClient() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const snap = await getDocs(
        query(
          collection(getClientDb(), "inquiries"),
          orderBy("createdAt", "desc"),
        ),
      );
      const rows: Inquiry[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: (data.name as string) ?? "",
          phone: (data.phone as string) ?? "",
          designTitle: data.designTitle as string | undefined,
          designSlug: data.designSlug as string | undefined,
          designCategory: data.designCategory as string | undefined,
          message: data.message as string | undefined,
          createdAt: (data.createdAt as number) ?? 0,
          handled: data.handled === true,
          handledAt: data.handledAt as number | undefined,
        };
      });
      setInquiries(rows);
    } catch (e) {
      setError("Failed to load inquiries.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onHandled = (id: string) => {
    setInquiries((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, handled: true, handledAt: Date.now() } : i,
      ),
    );
  };

  const newInquiries = inquiries.filter((i) => !i.handled);
  const handled = inquiries.filter((i) => i.handled);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Inquiries</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Customer inquiries from the website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Refresh inquiries"
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

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-white border border-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {/* ── New inquiries ──────────────────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                New
              </h2>
              {newInquiries.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                  {newInquiries.length}
                </span>
              )}
            </div>

            {newInquiries.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-10 text-center">
                <i className="ri-inbox-2-line text-3xl text-gray-300" />
                <p className="mt-3 text-sm text-gray-400">No new inquiries</p>
              </div>
            ) : (
              <div className="space-y-3">
                {newInquiries.map((inquiry) => (
                  <InquiryCard key={inquiry.id} inquiry={inquiry} onHandled={onHandled} />
                ))}
              </div>
            )}
          </section>

          {/* ── History ───────────────────────────────────────────── */}
          {handled.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                History — Handled ({handled.length})
              </h2>
              <div className="space-y-3">
                {handled.map((inquiry) => (
                  <InquiryCard key={inquiry.id} inquiry={inquiry} onHandled={onHandled} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
