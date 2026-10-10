import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InquiryForm } from "@/components/InquiryForm";
import { parseInquirySelection } from "@/lib/services";

export const metadata: Metadata = {
  title: "Project Inquiry — Blac Nova",
  description:
    "Start a project inquiry with Blac Nova — name, phone, and an optional design direction.",
};

type InquiryPageProps = PageProps<"/inquiry">;

function InquiryFallback() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-10">
      <div className="h-10 w-2/3 max-w-md bg-bone-200 rounded-lg mb-6" />
      <div className="h-4 w-full max-w-lg bg-bone-200 rounded mb-10" />
      <div className="h-80 bg-bone-200 rounded-2xl shimmer" />
    </div>
  );
}

async function InquiryContent({
  searchParams,
}: Pick<InquiryPageProps, "searchParams">) {
  const resolved = await searchParams;
  const selection = parseInquirySelection(resolved);

  return <InquiryForm initialSelection={selection} />;
}

export default function InquiryPage({ searchParams }: InquiryPageProps) {
  return (
    <main className="bg-bone-50 text-ink-900 overflow-hidden">
      <Header solid />
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <Suspense fallback={<InquiryFallback />}>
            <InquiryContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  );
}
