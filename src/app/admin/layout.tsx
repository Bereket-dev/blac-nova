import type { ReactNode } from "react";
import { AdminClientLayout } from "@/components/admin/AdminClientLayout";

// Admin routes are auth-gated and always need runtime data (auth state, pathname).
// instant=false allows the client shell to block on these values without Suspense.
export const instant = false;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
