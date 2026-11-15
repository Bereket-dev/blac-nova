import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the Blac Nova Homes website, project inquiries, and intellectual property.",
};

export default function TermsPage() {
  const updated = "15 November 2025";

  return (
    <main className="bg-bone-50 text-ink-900 overflow-hidden">
      <Header solid />

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-3 mb-7">
          <span className="w-10 h-px bg-ink-900/40" />
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
            Legal
          </span>
        </div>

        <h1 className="font-serif-display text-4xl md:text-5xl font-light text-ink-900 mb-4">
          Terms of Use
        </h1>
        <p className="text-sm text-ink-900/45 mb-14">Last updated: {updated}</p>

        <div className="space-y-10 text-ink-900/80 leading-relaxed">

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">About this site</h2>
            <p className="text-sm">
              This website belongs to <strong className="text-ink-900">Blac Nova Homes
              Construction &amp; Design</strong>, Dire Dawa, Ethiopia. By using this
              website you agree to these terms. If you do not agree, please do not use it.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Submitting an inquiry</h2>
            <p className="text-sm">
              Sending an inquiry through our website is not a contract, booking, or
              purchase agreement of any kind. It is simply an expression of interest
              that lets our team get in touch with you. No work begins, and no payment
              is due, until a separate written agreement is signed between you and
              Blac Nova Homes.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Content accuracy</h2>
            <p className="text-sm">
              We keep the project portfolio, service descriptions, and other content
              as accurate as possible, but we make no guarantee that every detail is
              complete or current. Photographs show finished or in-progress projects
              and may not reflect exact specifications available for future builds.
              Contact us for precise information before making any decisions.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Intellectual property</h2>
            <p className="text-sm">
              All content on this website — including photographs, project designs,
              written descriptions, and the Blac Nova Homes name and logo — is the
              property of Blac Nova Homes Construction &amp; Design. You may not
              reproduce, copy, or distribute any part of it without our written permission.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Limitation of liability</h2>
            <p className="text-sm">
              Blac Nova Homes is not liable for any loss or damage arising from your
              use of this website or reliance on information found here. The website is
              provided as-is, without warranty of any kind.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Governing law</h2>
            <p className="text-sm">
              These terms are governed by the laws of the Federal Democratic Republic
              of Ethiopia. Any disputes shall be handled in the courts of Dire Dawa
              or Addis Ababa.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Contact</h2>
            <p className="text-sm">
              Questions about these terms?{" "}
              <a
                href="tel:+251911369200"
                className="text-ink-900 underline hover:text-terracotta-500 transition-colors"
              >
                +251 911 369 200
              </a>
              {" "}or reach us on Telegram.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
