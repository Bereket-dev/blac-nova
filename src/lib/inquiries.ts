"use server";

import { getAdminDb } from "@/lib/firebase/admin";
import type { Inquiry } from "@/lib/types";

// ── Telegram notification ────────────────────────────────────────────────────

async function sendTelegramNotification(inquiry: Inquiry): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Silently skip — bot not configured yet
    return;
  }

  const lines = [
    "📬 *New Inquiry — Blac Nova Homes*",
    "",
    `👤 *Name:* ${inquiry.name}`,
    `📞 *Phone:* ${inquiry.phone}`,
  ];

  if (inquiry.designTitle) {
    lines.push(`🏠 *Design:* ${inquiry.designTitle} (${inquiry.designCategory ?? ""})`);
  }
  if (inquiry.message) {
    lines.push(`💬 *Message:* ${inquiry.message}`);
  }

  lines.push("");
  lines.push(`🕐 ${new Date(inquiry.createdAt).toLocaleString("en-ET", { timeZone: "Africa/Addis_Ababa" })}`);
  lines.push(`👉 [View in admin](https://blacnova.com/admin/inquiries)`);

  const text = lines.join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
  } catch {
    // Notification failure should not block the form submission
    console.error("[Telegram] Failed to send inquiry notification");
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
  } catch {
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

  // Fire-and-forget Telegram notification
  void sendTelegramNotification(inquiry);

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
