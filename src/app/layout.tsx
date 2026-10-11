import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const siteName = "Blac Nova";
const title = "Blac Nova — We Build Your Dream Home";
const description =
  "Blac Nova designs and builds houses, G+ buildings, and compound works across Ethiopia. Solid structure, clean handover.";

export const metadata: Metadata = {
  metadataBase: new URL("https://blacnova.com"),
  title: {
    default: title,
    template: `%s — ${siteName}`,
  },
  description,
  applicationName: siteName,
  authors: [{ name: "Blac Nova Construction & Design" }],
  creator: "Blac Nova Construction & Design",
  publisher: "Blac Nova Construction & Design Ltd.",
  keywords: [
    "Blac Nova",
    "construction Ethiopia",
    "house design",
    "G+ buildings",
    "compound works",
    "architecture",
    "Addis Ababa",
    "Dire Dawa",
    "home builder",
  ],
  category: "construction",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: "/",
    siteName,
    title,
    description,
    images: [
      {
        url: "/hero.png",
        width: 1671,
        height: 941,
        alt: "Blac Nova — construction and design in Ethiopia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone-50 text-ink-900">{children}</body>
    </html>
  );
}
