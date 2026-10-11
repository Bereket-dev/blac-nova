import { projects, type Project } from "./data";
import { img } from "./images";

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

export type DesignCategory = {
  id: string;
  label: string;
  description: string;
};

export type DesignOption = {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  location: string;
  tagline: string;
  summary: string;
  details: string[];
  materials: string[];
  area: string;
  year: string;
  image: string;
  alt: string;
  project: Project;
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

export const designCategories: DesignCategory[] = [
  {
    id: "residences",
    label: "Houses & G+ Buildings",
    description: "Private houses, family homes, and G+ residential buildings for daily life.",
  },
  {
    id: "leisure",
    label: "Guest House & Pool",
    description: "Guest houses and pool areas that sit cleanly with the main compound.",
  },
  {
    id: "landscape",
    label: "Compound Works",
    description: "Paths, terraces, planting, and outdoor areas planned with the house.",
  },
];

const categoryByProjectCategory: Record<string, string> = {
  "Private House": "residences",
  Residential: "residences",
  "Family Home": "residences",
  "Guest House": "leisure",
  Landscape: "landscape",
};

const designDetailsBySlug: Record<string, string[]> = {
  "private-villa-dire-dawa": [
    "G+2 private house with stone cladding and aluminum windows",
    "Living and kitchen on the ground floor; bedrooms above",
    "Wide openings to a shaded compound yard",
    "Finishes chosen for durability in daily use",
  ],
  "family-house-addis": [
    "Family house with a clear street front and private back garden",
    "Tall windows pulling daylight deep into the rooms",
    "Living on the garden side; quieter bedrooms above",
    "Cabinets, doors, and structure lined up as one build",
  ],
  "guest-house-pool": [
    "Guest house beside the pool for a private compound",
    "Deck and outdoor seating for day and evening use",
    "Low, simple massing so the yard stays open",
    "Building and planting planned together",
  ],
  "compound-landscaping": [
    "Compound outdoor areas across about 2,800 m²",
    "Clear path from entrance court to terrace and pond",
    "Existing trees kept where they give useful shade",
    "Stone, gravel, and planting doing the practical work",
  ],
  "g3-residential-dire-dawa": [
    "G+3 residential building on a Dire Dawa city plot",
    "Warm interiors readable through the elevation after dark",
    "Plan built around family flow and a protected courtyard",
    "Design-and-build delivery under one continuous specification",
  ],
};

export const designCatalog: DesignOption[] = projects.map((project) => ({
  id: project.slug,
  slug: project.slug,
  categoryId: categoryByProjectCategory[project.category] ?? "residences",
  title: project.title,
  location: project.location,
  tagline: project.summary,
  summary: project.description,
  details: designDetailsBySlug[project.slug] ?? project.scope,
  materials: project.materials,
  area: project.area,
  year: project.year,
  image: project.image,
  alt: project.alt,
  project,
}));

export function getDesign(id: string): DesignOption | undefined {
  return designCatalog.find((design) => design.id === id || design.slug === id);
}

export function designsByCategory(categoryId: string): DesignOption[] {
  return designCatalog.filter((design) => design.categoryId === categoryId);
}

export type InquirySelection = {
  design: string;
};

export const emptySelection = (): InquirySelection => ({
  design: "",
});

export function parseInquirySelection(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>,
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
  return {
    design: getDesign(designId) ? designId : "",
  };
}

export function selectionToSearchParams(selection: InquirySelection): string {
  const params = new URLSearchParams();
  if (selection.design) params.set("design", selection.design);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function summarizeSelection(selection: InquirySelection): string[] {
  if (!selection.design) return [];
  const design = getDesign(selection.design);
  if (!design) return [];
  return [`Design interest: ${design.title} — ${design.location}`];
}

export const INQUIRY_EMAIL = "hello@blacnova.com";
export const INQUIRY_TELEGRAM = "https://t.me/+251911369200";
