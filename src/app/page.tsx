import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Inquiry } from "@/components/Inquiry";
import { Marquee } from "@/components/Marquee";
import { Owner } from "@/components/Owner";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { ProjectFilm } from "@/components/ProjectFilm";
import { Reviews } from "@/components/Reviews";

export default function Home() {
  return (
    <main className="bg-bone-50 text-ink-900 overflow-hidden">
      <Header />
      <Hero />
      <Marquee />
      <ProjectFilm />
      <Services />
      <Projects />
      <Owner />
      <Reviews />
      <Inquiry />
      <Footer />
    </main>
  );
}
