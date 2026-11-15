"use client";

import type { ReactNode } from "react";

/** Default admin input styles; pass `error` to highlight invalid required fields. */
export function fieldInputClass(error?: boolean, variant: "default" | "amharic" = "default") {
  if (variant === "amharic") {
    return error
      ? "w-full border border-red-400 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50"
      : "w-full border border-amber-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-amber-50/40";
  }

  return error
    ? "w-full border border-red-400 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50 disabled:bg-red-50 disabled:text-gray-400"
    : "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 bg-gray-50";
}

export function requiredMsg(label: string): string {
  return `${label} is required`;
}

export function FormField({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block">
        <span
          className={`block text-xs font-semibold mb-2 ${
            error ? "text-red-700" : "text-gray-700"
          }`}
        >
          {label}
          {required ? (
            <span className="text-red-500 ml-0.5" aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
        {hint ? (
          <span className="block text-xs text-gray-400 mb-2">{hint}</span>
        ) : null}
        {children}
      </label>
      {error ? (
        <p
          className="mt-1.5 text-xs text-red-600 flex items-start gap-1"
          role="alert"
        >
          <i className="ri-error-warning-line text-sm shrink-0 mt-px" aria-hidden />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

export function FormErrorBanner({
  message,
  fieldCount,
}: {
  message: string;
  /** When > 0, shows a short “fix N fields” helper under the message. */
  fieldCount?: number;
}) {
  if (!message) return null;

  return (
    <div
      className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
      role="alert"
    >
      <div className="flex items-start gap-2">
        <i className="ri-error-warning-line text-base shrink-0 mt-0.5" aria-hidden />
        <div>
          <p className="font-medium">{message}</p>
          {fieldCount && fieldCount > 0 ? (
            <p className="mt-0.5 text-xs text-red-600/80">
              Fix {fieldCount} highlighted field{fieldCount === 1 ? "" : "s"} below
              and try again.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Clear one field error when the user edits that field. */
export function clearFieldError<T extends string>(
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<T, string>>>>,
  key: T,
) {
  setErrors((prev) => {
    if (!prev[key]) return prev;
    const next = { ...prev };
    delete next[key];
    return next;
  });
}
