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
    tagline: "Concept to completion drawings that hold their line.",
    summary:
      "We design residences that respond to site, light, and how you live — then document them so they can be built without compromise.",
    image: img.archHero,
    imageAlt: "Limestone and bronze residence at golden hour",
    gallery: [
      {
        src: img.archInterior,
        alt: "Double-height living room with oak and travertine",
      },
      {
        src: img.archDetail,
        alt: "Bronze window frame against limestone",
      },
    ],
    youGet: [
      "Site study and design brief",
      "Concept options and preferred scheme",
      "Developed plans, elevations, and sections",
      "Material and joinery direction",
      "Planning and authority support as required",
    ],
    process: [
      {
        step: "01",
        title: "Listen & survey",
        detail: "We walk the site, clarify the brief, and fix constraints before a line is drawn.",
      },
      {
        step: "02",
        title: "Compose options",
        detail: "Two to three clear design directions — not endless moodboards — so you can choose with confidence.",
      },
      {
        step: "03",
        title: "Develop & detail",
        detail: "The chosen scheme becomes coordinated drawings, materials, and joinery ready for build.",
      },
      {
        step: "04",
        title: "Support through build",
        detail: "We stay with the project so design intent survives site decisions and snagging.",
      },
    ],
  },
  {
    id: "construction",
    roman: "II",
    index: "02",
    title: "Construction Management",
    tagline: "Built with accountability from foundation to final fixture.",
    summary:
      "One team owns programme, quality, and cost on site — so the home you approved is the home that is delivered.",
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
      "Programme and cost control",
      "Trade coordination and site supervision",
      "Quality checks at every stage",
      "Clear client reporting",
      "Handover and snagging to completion",
    ],
    process: [
      {
        step: "01",
        title: "Mobilise",
        detail: "We set programme, appointments, and site rules before ground is broken.",
      },
      {
        step: "02",
        title: "Build in sequence",
        detail: "Structure, envelope, services, and finishes progress in a controlled order with weekly oversight.",
      },
      {
        step: "03",
        title: "Protect quality",
        detail: "Hold-points and inspections catch issues early — not at handover.",
      },
      {
        step: "04",
        title: "Hand over cleanly",
        detail: "Snagging, manuals, and a finished home ready to live in — not almost finished.",
      },
    ],
  },
  {
    id: "landscape",
    roman: "III",
    index: "03",
    title: "Landscape & Pools",
    tagline: "Outdoor rooms shaped with stone, water, planting, and light.",
    summary:
      "Gardens, terraces, courtyards, and leisure pavilions designed as architecture without a roof — continuous with the house.",
    image: img.landHero,
    imageAlt: "Infinity pool, stone terrace, and pavilion at golden hour",
    gallery: [
      {
        src: img.landGarden,
        alt: "Formal garden path and water",
      },
      {
        src: img.landPavilion,
        alt: "Timber pool pavilion opening to water",
      },
    ],
    youGet: [
      "Landscape master plan",
      "Terraces, courts, and planting design",
      "Pool and water features where required",
      "Hardscape material specification",
      "Implementation coordination with the build",
    ],
    process: [
      {
        step: "01",
        title: "Read the ground",
        detail: "Levels, aspect, trees, and views define what the landscape should protect and reveal.",
      },
      {
        step: "02",
        title: "Draw outdoor rooms",
        detail: "We compose terraces, planting, and water as a sequence — not a list of features.",
      },
      {
        step: "03",
        title: "Specify & set out",
        detail: "Stone, planting, and pool engineering are detailed so the field matches the drawing.",
      },
      {
        step: "04",
        title: "Establish & settle",
        detail: "Installation, planting establishment, and finishing so the garden feels inevitable from day one.",
      },
    ],
  },
];

export const designCategories: DesignCategory[] = [
  {
    id: "residences",
    label: "Residences",
    description: "Town and family homes composed for light, proportion, and daily life.",
  },
  {
    id: "leisure",
    label: "Leisure",
    description: "Pool houses and pavilions where landscape becomes the main room.",
  },
  {
    id: "landscape",
    label: "Landscape",
    description: "Gardens, terraces, and outdoor rooms drawn with the same care as the house.",
  },
];

const categoryByProjectCategory: Record<string, string> = {
  "Luxury Home": "residences",
  Residential: "residences",
  "Family Home": "residences",
  "Pool & Leisure": "leisure",
  Landscape: "landscape",
};

const designDetailsBySlug: Record<string, string[]> = {
  "the-hartley-hotel": [
    "Limestone and bronze street presence with quiet grandeur",
    "Double-height reception organised around a central stair",
    "Floor-to-ceiling glass opening to a private street garden",
    "Interiors prioritising proportion over ornament",
  ],
  "serpentine-house": [
    "Pale-brick Chelsea townhouse rewritten for garden light",
    "Tall vertical windows pulling daylight deep into the plan",
    "Family rooms on the garden level; quieter suites above",
    "Furniture, joinery, and structure sharing one geometry",
  ],
  "azure-pavilion": [
    "Dark-timber pavilion that dissolves into hills and sky",
    "Infinity edge borrowing the horizon as the primary view",
    "Low, quiet massing so landscape remains the main room",
    "Architecture and planting designed as one continuous object",
  ],
  "thornfield-gardens": [
    "Four hectares of formal garden rooms and water",
    "Procession from arrival court to terrace, pond, and meadow",
    "Existing mature oaks protected as the backbone of the plan",
    "Stone, hedge, and water doing the heavy spatial lifting",
  ],
  "meridian-tower": [
    "Curved-glass family home softening an urban edge",
    "Warm interiors readable through the façade after dark",
    "Plan built around family flow and a protected courtyard",
    "Design-and-build delivery held to one continuous specification",
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
