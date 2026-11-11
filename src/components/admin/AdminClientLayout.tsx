"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin/auth";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/categories", label: "Categories" },
];

function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLogin) router.replace("/admin/login");
    if (user && isLogin) router.replace("/admin");
  }, [user, loading, isLogin, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bone-50 text-ink-900 flex items-center justify-center">
        <p className="text-sm tracking-wide uppercase text-ink-900/50">Loading…</p>
      </div>
    );
  }

  if (isLogin) {
    return <div className="min-h-screen bg-bone-50 text-ink-900">{children}</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bone-50 text-ink-900 flex items-center justify-center">
        <p className="text-sm tracking-wide uppercase text-ink-900/50">Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone-50 text-ink-900">
      <header className="border-b border-ink-900/10 bg-bone-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-serif-display text-xl">
              Blac Nova Admin
            </Link>
            <nav className="flex flex-wrap gap-3">
              {nav.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[12px] tracking-widest-2 uppercase ${
                      active ? "text-terracotta-500" : "text-ink-900/60 hover:text-ink-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-ink-900/45 truncate max-w-[180px]">
              {user.email}
            </span>
            <button
              type="button"
              onClick={() => logout()}
              className="text-[12px] tracking-widest-2 uppercase text-ink-900/60 hover:text-terracotta-500"
            >
              Sign out
            </button>
            <Link
              href="/"
              className="text-[12px] tracking-widest-2 uppercase text-ink-900/60 hover:text-ink-900"
            >
              View site
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}

export function AdminClientLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
