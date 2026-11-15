import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Blac Nova Homes collects, uses, and stores the information you share with us.",
};

export default function PrivacyPage() {
  const updated = "15 November 2026";

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
          Privacy Policy
        </h1>
        <p className="text-sm text-ink-900/45 mb-14">Last updated: {updated}</p>

        <div className="prose-custom space-y-10 text-ink-900/80 leading-relaxed">

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Who we are</h2>
            <p className="text-sm">
              This website is operated by <strong className="text-ink-900">Blac Nova Homes Construction &amp; Design</strong>,
              based in Dire Dawa, Ethiopia. We design and build residential properties —
              houses, G+ buildings, and compound works. This policy explains what information
              we collect through this website, why we collect it, and how we handle it.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">What we collect</h2>
            <p className="text-sm mb-4">
              We only collect information you actively give us. We do not use tracking
              scripts, analytics platforms, or advertising networks on this website.
            </p>
            <div className="space-y-5">
              <div className="border-l-2 border-ink-900/15 pl-5">
                <p className="text-sm font-medium text-ink-900 mb-1">Project inquiries</p>
                <p className="text-sm">
                  When you submit an inquiry form, we collect your <strong>name</strong>,
                  <strong> phone number</strong>, and an optional <strong>message</strong>.
                  If you selected a design from our services page, we also record that
                  selection. This information is shared with our internal team so we
                  can respond to your inquiry.
                </p>
              </div>
              <div className="border-l-2 border-ink-900/15 pl-5">
                <p className="text-sm font-medium text-ink-900 mb-1">Newsletter sign-up</p>
                <p className="text-sm">
                  If you enter your email address in the footer sign-up form, we store
                  your <strong>email address</strong> and the date you subscribed in our
                  private database. We use this to send occasional project updates. We
                  do not share your email with third parties or marketing platforms.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">How we use it</h2>
            <ul className="text-sm space-y-2 list-none">
              {[
                "To contact you about your project inquiry.",
                "To send project updates if you subscribed.",
                "To improve how we respond to future inquiries.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-ink-900/40 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4">
              We do not sell, rent, or share your personal information with any third
              party outside our company, except as necessary to deliver the service
              (e.g. the Telegram notification to our internal team).
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Storage and security</h2>
            <p className="text-sm">
              Information you submit through this website is stored securely and
              accessible only to authorised Blac Nova staff. We do not store payment
              information — no transactions take place on this website.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Cookies</h2>
            <p className="text-sm">
              This website does not use cookies. No tracking, analytics, or advertising
              cookies are set. The only storage used is a language preference saved
              to your browser&rsquo;s <code className="text-xs bg-ink-900/5 px-1 py-0.5 rounded">localStorage</code>,
              which stays entirely on your device.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Your rights</h2>
            <p className="text-sm">
              You can ask us to view, correct, or delete any personal data we hold about
              you at any time. Contact us at{" "}
              <a
                href="tel:+251911369200"
                className="text-ink-900 underline hover:text-terracotta-500 transition-colors"
              >
                +251 911 369 200
              </a>{" "}
              or via Telegram and we will respond within a reasonable time.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink-900 text-base mb-3">Changes to this policy</h2>
            <p className="text-sm">
              If we change how we handle personal data in a meaningful way, we will
              update this page and revise the date at the top.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
