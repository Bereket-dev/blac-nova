import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DesignExplorer } from "@/components/DesignExplorer";
import { ServicesGuide } from "@/components/ServicesGuide";

export const metadata: Metadata = {
  title: "Services — Blac Nova",
  description:
    "Architecture, construction, and landscape — see the work, understand how we deliver, and inquire with an optional design direction.",
};

function ExplorerFallback() {
  return (
    <section className="relative bg-bone-100 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="h-10 w-2/3 max-w-lg bg-bone-200 rounded-lg mb-4" />
        <div className="h-4 w-full max-w-xl bg-bone-200 rounded mb-14" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <div className="h-36 bg-bone-200 rounded-xl" />
            <div className="h-36 bg-bone-200 rounded-xl" />
          </div>
          <div className="lg:col-span-7 h-96 bg-bone-200 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-bone-50 text-ink-900 overflow-hidden">
      <Header solid />
      <ServicesGuide />
      <Suspense fallback={<ExplorerFallback />}>
        <DesignExplorer />
      </Suspense>
      <Footer />
    </main>
  );
}
