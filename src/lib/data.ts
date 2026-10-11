import { img } from "./images";

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  index: string;
  collaborator: string;
  area: string;
  year: string;
  image: string;
  alt: string;
  summary: string;
  description: string;
  approach: string;
  scope: string[];
  materials: string[];
  status: string;
};

export const marqueeItems = [
  "Dream homes delivered nationwide",
  "Architecture · Construction · Finishing",
  "Residential design & build",
  "Solid structure, clean handover",
  "Houses, G+ buildings & renovations",
  "120+ homes completed",
  "We build your dream home",
];

export const projects: Project[] = [
  {
    slug: "private-villa-dire-dawa",
    title: "G+2 Private House",
    location: "Dire Dawa",
    category: "Private House",
    index: "01",
    collaborator: "Blac Nova Architecture",
    area: "480 m²",
    year: "2025",
    image: img.projectG2,
    alt: "G+2 private house in Dire Dawa",
    summary:
      "A G+2 private house on a city plot — strong structure, clean finishes, and a shaded compound yard.",
    description:
      "This G+2 private house turns a tight Dire Dawa plot into a practical family home. Wide windows bring light into the living rooms, while stone cladding and aluminum framing keep the elevation neat and durable. Inside, rooms sit around a central stair — living and kitchen on the ground floor, bedrooms above.",
    approach:
      "We handled design through construction: structure, elevations, and finishing as one job. From gate to entrance to upper floors, every stage was coordinated so the build matches the drawings.",
    scope: [
      "Architectural design",
      "Site supervision",
      "Interior finishing",
      "Compound landscaping",
    ],
    materials: ["Hollow block", "Stone cladding", "Aluminum windows", "Ceramic tile", "Paint"],
    status: "Completed 2025",
  },
  {
    slug: "family-house-addis",
    title: "Family House",
    location: "Addis Ababa",
    category: "Residential",
    index: "02",
    collaborator: "Blac Nova Design",
    area: "320 m²",
    year: "2024",
    image: img.projectFamily,
    alt: "Family house in Addis Ababa",
    summary:
      "A family house planned for daily life — bright rooms, a small garden, and finishes that hold up.",
    description:
      "This Addis Ababa family house keeps a clear street front while opening to a private back garden. Tall windows pull daylight deep into the plan; plaster, paint, and timber keep the look simple. Living rooms sit on the garden side; bedrooms sit above for quiet.",
    approach:
      "Design and interiors were developed together so cabinets, doors, and structure line up. The garden was treated as outdoor living space — planted for shade and easy upkeep.",
    scope: [
      "Residential redesign",
      "Interior finishing",
      "Garden works",
      "Kitchen & cabinets",
    ],
    materials: ["Concrete", "Plaster", "Timber", "Ceramic tile", "Natural stone"],
    status: "Completed 2024",
  },
  {
    slug: "guest-house-pool",
    title: "Guest House & Pool",
    location: "Dire Dawa",
    category: "Guest House",
    index: "03",
    collaborator: "Blac Nova Landscape",
    area: "180 m²",
    year: "2024",
    image: img.projectGuest,
    alt: "Guest house and pool in Dire Dawa",
    summary:
      "A guest house with pool and outdoor seating for a private compound on the edge of Dire Dawa.",
    description:
      "This guest house sits low beside the pool — timber, glass, and a clear deck for sitting outside. The building stays simple so the yard and water do the work. Sliding doors open to the pool; changing light keeps the space useful day and evening.",
    approach:
      "Building and outdoor works were planned together: planting frames views, the deck lines up with the water, and services stay hidden so the compound reads clean.",
    scope: [
      "Guest house design & build",
      "Pool construction",
      "Deck & outdoor seating",
      "Compound planting",
    ],
    materials: ["Timber", "Glass", "Stone deck", "Concrete", "Water"],
    status: "Completed 2024",
  },
  {
    slug: "compound-landscaping",
    title: "Compound Landscaping",
    location: "Adama",
    category: "Landscape",
    index: "04",
    collaborator: "Blac Nova Landscape",
    area: "2,800 m²",
    year: "2023",
    image: img.projectLandscape,
    alt: "Compound landscaping in Adama",
    summary:
      "Compound outdoor works — paths, planting, and a small water feature for a private site in Adama.",
    description:
      "This landscaping job organises a large compound into clear outdoor areas — entrance court, terrace, planted beds, and a small pond. Existing trees were kept where possible. The work balances hard surfaces for access with soft planting for shade.",
    approach:
      "We surveyed trees and levels first, then set out paths and planting that protect shade and sightlines. Stone, gravel, and hedge lines do the structure; planting fills in by season.",
    scope: [
      "Compound layout plan",
      "Stone paths & terraces",
      "Water feature",
      "Planting & fencing line",
    ],
    materials: ["Local stone", "Gravel", "Timber", "Water", "Planting"],
    status: "Completed 2023",
  },
  {
    slug: "g3-residential-dire-dawa",
    title: "G+3 Residential Building",
    location: "Dire Dawa",
    category: "Family Home",
    index: "05",
    collaborator: "Blac Nova Construction",
    area: "890 m²",
    year: "2026",
    image: img.projectG3,
    alt: "G+3 residential building in Dire Dawa",
    summary:
      "A G+3 residential building for a Dire Dawa family — solid frame, clear plan, and finishes built for daily use.",
    description:
      "This G+3 residential building gives a growing family space on a city plot. The elevation uses glass and cladding for a modern look; warm interiors show through after dark. The plan prioritises family flow — open living, quiet bedrooms, and a protected courtyard for children.",
    approach:
      "Blac Nova Construction delivered design and build from foundation to final checks. Structure, elevations, MEP, and finishing stayed under one specification so the building feels consistent inside and out.",
    scope: [
      "Design & build",
      "Structure & elevations",
      "Interior finishing",
      "Courtyard works",
    ],
    materials: ["Reinforced concrete", "Glass", "Cladding", "Hollow block", "Timber"],
    status: "In progress — 2026",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getOtherProjects(slug: string): Project[] {
  return projects.filter((project) => project.slug !== slug);
}

export const PROJECT_FILM = {
  title: "G+2 House, Dire Dawa",
  subtitle: "Dire Dawa · Site walkthrough",
  location: "Dire Dawa · Ethiopia",
  duration: "Short cut",
  description:
    "A quick look at a finished house — walls, finishes, and outdoor space as built. Play when you’re ready; it pauses when you scroll away.",
  poster: "/video-poster.jpg",
  src: "/video.mp4",
};

export const HERO_IMAGE = "/hero.png?v=07490596";

export const CTA_IMAGE = img.cta;

export const teamAvatars = [img.avatar1, img.avatar2, img.avatar3];

export const OWNER = {
  image: "/owner.jpeg",
  role: "Founder & Managing Director",
  eyebrow: "About the company",
  homeHeadline: "One standard on every site — homes built to last.",
  homeSummary:
    "Blac Nova is a construction and design company shaped by its founder: clear briefs, honest materials, and accountability from drawing to handover.",
  aboutHeadline: "We build the homes people have planned for years.",
  aboutSummary:
    "Every project starts with the plot, the budget, and how a family actually lives. Our founder keeps the same standard on every site: solid structure, clean finishes, and work that lasts.",
  aboutBody: [
    "Architecture, construction, and outdoor works sit under one roof so nothing is lost between the drawing and the build. You deal with people who stay on the project — not a revolving door of subcontractors.",
    "We favour practical rooms, durable finishes, and details you notice every day. The real test is whether the house still works well ten years on.",
  ],
};

export const reviews = [
  {
    quote:
      "Blac Nova builds the kind of house you can actually live in for years. Ours feels solid, finished properly, and right for the plot.",
    name: "Abebe Tadesse",
    role: "Private Client, Dire Dawa",
    avatar: img.avatar2,
  },
  {
    quote:
      "Schedule, quality, and cost stayed clear from foundation to final fixing. We always knew who owned the next decision — and the house matches the drawings we approved.",
    name: "Sara Mekonnen",
    role: "Private Client, Addis Ababa",
    avatar: img.avatar1,
  },
  {
    quote:
      "They treated the compound as part of the house. The terrace, planting, and pool work together with the building — clean, practical, and completely ours.",
    name: "Daniel Haile",
    role: "Private Client, Adama",
    avatar: img.avatar3,
  },
];
