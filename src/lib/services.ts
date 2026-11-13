import { img } from "./images";
import type { DesignCategory, DesignOption } from "./types";

export type { DesignCategory, DesignOption } from "./types";
export type { Project } from "./types";

export type ServiceOption = {
  id: string;
  roman: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  youGet: string[];
  process: { step: string; title: string; detail: string }[];
};

export const servicesCatalog: ServiceOption[] = [
  {
    id: "architecture",
    roman: "I",
    index: "01",
    title: "Architecture & Design",
    tagline: "Concept to working drawings you can build from.",
    summary:
      "We design houses and G+ buildings that fit the plot, the climate, and how you live — then produce drawings the site can follow.",
    image: img.archHero,
    imageAlt: "G+2 house elevation at golden hour",
    gallery: [
      {
        src: img.archInterior,
        alt: "Living room with timber and tile finishes",
      },
      {
        src: img.archDetail,
        alt: "Aluminum window frame against stone cladding",
      },
    ],
    youGet: [
      "Site visit and design brief",
      "Concept options and preferred layout",
      "Plans, elevations, and sections",
      "Material and finishing direction",
      "Permit support as required",
    ],
    process: [
      {
        step: "01",
        title: "Listen & survey",
        detail: "We walk the plot, clarify the brief, and fix constraints before a line is drawn.",
      },
      {
        step: "02",
        title: "Offer options",
        detail: "Two to three clear layout options — so you can choose with confidence, not guesswork.",
      },
      {
        step: "03",
        title: "Detail for build",
        detail: "The chosen layout becomes coordinated drawings, materials, and cabinets ready for site.",
      },
      {
        step: "04",
        title: "Support through build",
        detail: "We stay with the project so the drawings survive site decisions and final checks.",
      },
    ],
  },
  {
    id: "construction",
    roman: "II",
    index: "02",
    title: "Construction Management",
    tagline: "From foundation to final fixing — on schedule.",
    summary:
      "One team owns schedule, quality, and cost on site — so the house you approved is the house that is handed over.",
    image: img.buildHero,
    imageAlt: "Active construction site with scaffolding and frame rising",
    gallery: [
      {
        src: img.buildStair,
        alt: "Builders working on a residential structure",
      },
      {
        src: img.buildKitchen,
        alt: "Construction crew on site during build",
      },
    ],
    youGet: [
      "Schedule and cost control",
      "Trade coordination and site supervision",
      "Quality checks at every stage",
      "Clear client reporting",
      "Handover and final checks to completion",
    ],
    process: [
      {
        step: "01",
        title: "Start on site",
        detail: "We set schedule, trades, and site rules before ground is broken.",
      },
      {
        step: "02",
        title: "Build in sequence",
        detail: "Structure, walls, services, and finishes move in a clear order with weekly site checks.",
      },
      {
        step: "03",
        title: "Protect quality",
        detail: "Stage inspections catch issues early — not at handover.",
      },
      {
        step: "04",
        title: "Hand over cleanly",
        detail: "Final checks and a finished home ready to live in — not almost finished.",
      },
    ],
  },
  {
    id: "landscape",
    roman: "III",
    index: "03",
    title: "Landscape & Pools",
    tagline: "Compound outdoor works — paths, planting, pool, and seating.",
    summary:
      "Compound landscaping, terraces, courtyards, and guest houses planned with the main building — not as an afterthought.",
    image: img.landHero,
    imageAlt: "Pool, stone terrace, and guest house at golden hour",
    gallery: [
      {
        src: img.landGarden,
        alt: "Compound garden path and planting",
      },
      {
        src: img.landPavilion,
        alt: "Guest house opening to the pool",
      },
    ],
    youGet: [
      "Compound layout plan",
      "Terraces, courts, and planting design",
      "Pool and water features where required",
      "Hard surface material specification",
      "Coordination with the main build",
    ],
    process: [
      {
        step: "01",
        title: "Survey the plot",
        detail: "Levels, shade, trees, and access define what the outdoor works should protect and open up.",
      },
      {
        step: "02",
        title: "Plan outdoor areas",
        detail: "We set terraces, planting, and water as a clear sequence — not a list of extras.",
      },
      {
        step: "03",
        title: "Specify & set out",
        detail: "Stone, planting, and pool works are detailed so the site matches the drawing.",
      },
      {
        step: "04",
        title: "Install & finish",
        detail: "Installation, planting, and finishing so the compound is usable from day one.",
      },
    ],
  },
];

export type InquirySelection = {
  design: string;
};

export const emptySelection = (): InquirySelection => ({
  design: "",
});

export function parseInquirySelection(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>,
  designs?: DesignOption[],
): InquirySelection {
  const get = (key: string) => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) ?? "";
    }
    const value = searchParams[key];
    if (Array.isArray(value)) return value[0] ?? "";
    return value ?? "";
  };

  const designId = get("design");
  if (!designId) return { design: "" };
  if (!designs) return { design: designId };
  const exists = designs.some((design) => design.id === designId || design.slug === designId);
  return { design: exists ? designId : "" };
}

export function selectionToSearchParams(selection: InquirySelection): string {
  const params = new URLSearchParams();
  if (selection.design) params.set("design", selection.design);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function summarizeSelection(
  selection: InquirySelection,
  designs: DesignOption[],
): string[] {
  if (!selection.design) return [];
  const design = designs.find(
    (item) => item.id === selection.design || item.slug === selection.design,
  );
  if (!design) return [];
  return [`Design interest: ${design.title} — ${design.location}`];
}

export function findCategoryLabel(
  categories: DesignCategory[],
  categoryId: string,
): string {
  return categories.find((category) => category.id === categoryId)?.label ?? "";
}

/** Pure client-safe helpers — work on already-fetched arrays. */
export function designsByCategory(
  designs: DesignOption[],
  categoryId: string,
): DesignOption[] {
  return designs.filter((design) => design.categoryId === categoryId);
}

export function findDesign(
  designs: DesignOption[],
  id: string,
): DesignOption | undefined {
  return designs.find((design) => design.id === id || design.slug === id);
}

export const INQUIRY_TELEGRAM = "https://t.me/+251911369200";
