import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/InquiryForm";
import { Owner } from "@/components/Owner";
import { getDesignCatalog, getDesignCategories } from "@/lib/designs";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the founder behind Blac Nova and start a project inquiry — name, phone, and an optional design direction.",
};

function InquiryFallback() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-10">
      <div className="h-10 w-2/3 max-w-md bg-bone-200 rounded-lg mb-6" />
      <div className="h-4 w-full max-w-lg bg-bone-200 rounded mb-10" />
      <div className="h-80 bg-bone-200 rounded-2xl shimmer" />
    </div>
  );
}

// Fetches the cached data, then hands it to the client form.
// searchParams is read on the client via useSearchParams() inside InquiryForm
// so this component has no runtime dependencies — it can prerender fully.
async function InquiryContent() {
  const [categories, designs] = await Promise.all([
    getDesignCategories(),
    getDesignCatalog(),
  ]);

  return (
    <InquiryForm
      categories={categories}
      designs={designs}
    />
  );
}

export default function AboutPage() {
  return (
    <main className="bg-bone-50 text-ink-900 overflow-hidden">
      <Header solid />
      <Owner variant="about" />
      <section id="inquire" className="relative bg-bone-100 py-20 md:pb-28 md:pt-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <Suspense fallback={<InquiryFallback />}>
            <InquiryContent />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  );
}
