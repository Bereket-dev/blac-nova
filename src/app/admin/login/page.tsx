"use client";

import { FormEvent, useState } from "react";
import { useAdminAuth } from "@/lib/admin/auth";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch {
      setError("Sign-in failed. Check the fake phone@email and password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-ink-900/10 bg-bone-50 p-8 space-y-5"
      >
        <div>
          <p className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-2">
            Owner access
          </p>
          <h1 className="font-serif-display text-3xl font-light">Admin sign in</h1>
          <p className="mt-3 text-sm text-ink-900/55 leading-relaxed">
            Use your fake phone email, e.g.{" "}
            <span className="text-ink-900">0912345678@blacnova.local</span>, and password.
          </p>
        </div>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:border-ink-900/40"
            placeholder="0912345678@blacnova.local"
            autoComplete="username"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
            Password
          </span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:border-ink-900/40"
            autoComplete="current-password"
          />
        </label>

        {error ? <p className="text-sm text-terracotta-500">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-ink-900 text-bone-50 px-6 py-3 text-[13px] tracking-wide uppercase hover:bg-terracotta-500 transition-colors disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
