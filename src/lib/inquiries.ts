"use server";

import { getAdminDb } from "@/lib/firebase/admin";
import type { Inquiry } from "@/lib/types";

// ── Telegram notification ────────────────────────────────────────────────────

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramNotification(inquiry: Inquiry): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.warn("[Telegram] Skipping notification — TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
    return;
  }

  const lines = [
    "📬 <b>New Inquiry — Blac Nova Homes</b>",
    "",
    `👤 <b>Name:</b> ${escapeHtml(inquiry.name)}`,
    `📞 <b>Phone:</b> ${escapeHtml(inquiry.phone)}`,
  ];

  if (inquiry.designTitle) {
    lines.push(
      `🏠 <b>Design:</b> ${escapeHtml(inquiry.designTitle)} (${escapeHtml(inquiry.designCategory ?? "")})`,
    );
  }
  if (inquiry.message) {
    lines.push(`💬 <b>Message:</b> ${escapeHtml(inquiry.message)}`);
  }

  lines.push("");
  lines.push(
    `🕐 ${new Date(inquiry.createdAt).toLocaleString("en-ET", { timeZone: "Africa/Addis_Ababa" })}`,
  );
  lines.push(`👉 <a href="https://blac-nova.vercel.app/admin/inquiries">View in admin</a>`);

  const text = lines.join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[Telegram] sendMessage failed", res.status, body);
    }
  } catch (err) {
    // Notification failure should not block the form submission
    console.error("[Telegram] Failed to send inquiry notification", err);
  }
}

// ── Main action ──────────────────────────────────────────────────────────────

export type SubmitInquiryInput = {
  name: string;
  phone: string;
  designTitle?: string;
  designSlug?: string;
  designCategory?: string;
  message?: string;
};

export async function submitInquiry(
  input: SubmitInquiryInput,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  // Basic validation
  const name = input.name?.trim();
  const phone = input.phone?.trim();

  if (!name || name.length < 2) return { ok: false, error: "Name is required." };
  if (!phone || phone.length < 7) return { ok: false, error: "Phone number is required." };

  let db: ReturnType<typeof getAdminDb>;
  try {
    db = getAdminDb();
  } catch (err) {
    console.error("[submitInquiry] Firebase Admin init failed:", err);
    return { ok: false, error: "Service temporarily unavailable. Please try again." };
  }
  const ref = db.collection("inquiries").doc(); // auto-id

  const inquiry: Inquiry = {
    id: ref.id,
    name,
    phone,
    ...(input.designTitle ? { designTitle: input.designTitle } : {}),
    ...(input.designSlug ? { designSlug: input.designSlug } : {}),
    ...(input.designCategory ? { designCategory: input.designCategory } : {}),
    ...(input.message?.trim() ? { message: input.message.trim() } : {}),
    createdAt: Date.now(),
    handled: false,
  };

  try {
    await ref.set(inquiry);
  } catch (err) {
    console.error("[submitInquiry] Firestore write failed:", err);
    return { ok: false, error: "Failed to submit. Please try again." };
  }

  // Must await on Vercel — fire-and-forget is frozen when the Server Action returns.
  await sendTelegramNotification(inquiry);

  return { ok: true, id: ref.id };
}

// ── Admin actions ────────────────────────────────────────────────────────────

export async function markInquiryHandled(id: string): Promise<void> {
  const db = getAdminDb();
  await db.collection("inquiries").doc(id).update({
    handled: true,
    handledAt: Date.now(),
  });
}
