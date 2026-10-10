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
  value: string;
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
  "Architecture · Construction · Interiors",
  "Award-winning residential design",
  "Sustainable building practice",
  "Custom estates & renovations",
  "120+ homes completed",
  "We build your dream home",
];

export const projects: Project[] = [
  {
    slug: "the-hartley-hotel",
    title: "The Hartley Residence",
    location: "Mayfair, London",
    category: "Luxury Home",
    index: "01",
    collaborator: "Blac Nova Architecture",
    area: "1,240 m²",
    year: "2025",
    value: "£4.8M",
    image: img.hartley,
    alt: "The Hartley Residence, Mayfair, London",
    summary:
      "A limestone and bronze town residence composed for quiet grandeur on a Mayfair street.",
    description:
      "The Hartley Residence reworks a constrained urban plot into a sequence of calm, light-filled rooms. Floor-to-ceiling glazing opens the principal volumes to the street garden, while bronze framing and pale limestone keep the façade refined and enduring. Interiors are organised around a central stair and double-height reception — proportion first, ornament second.",
    approach:
      "We led architecture through construction, coordinating structure, façade, and joinery as one continuous language. Every threshold was drawn to feel inevitable: from kerb to entrance, from day rooms to private floors.",
    scope: [
      "Full architectural design",
      "Construction management",
      "Custom joinery & interiors",
      "Landscape courtyard",
    ],
    materials: ["Limestone", "Bronze", "Oak", "Travertine", "Brushed steel"],
    status: "Completed 2025",
  },
  {
    slug: "serpentine-house",
    title: "Serpentine House",
    location: "Chelsea, London",
    category: "Residential",
    index: "02",
    collaborator: "Blac Nova Design",
    area: "680 m²",
    year: "2024",
    value: "£3.4M",
    image: img.serpentine,
    alt: "Serpentine House, Chelsea, London",
    summary:
      "A pale-brick Chelsea townhouse organised around garden light and vertical calm.",
    description:
      "Serpentine House is a quiet rewrite of a Chelsea terrace — retaining street presence while opening the plan to a private garden. Tall vertical windows pull daylight deep into the plan; pale brick and soft timber keep the palette restrained. Family rooms sit on the garden level; quieter suites rise above.",
    approach:
      "Design and interiors were developed together so furniture, joinery, and structure share the same geometry. The garden was treated as a room without a ceiling — planted for year-round green against the pale brick.",
    scope: [
      "Residential redesign",
      "Interior architecture",
      "Garden integration",
      "Bespoke kitchen & joinery",
    ],
    materials: ["Pale brick", "Limed oak", "Brass", "Wool", "Natural stone"],
    status: "Completed 2024",
  },
  {
    slug: "azure-pavilion",
    title: "Azure Pavilion",
    location: "Cotswolds, UK",
    category: "Pool & Leisure",
    index: "03",
    collaborator: "Blac Nova Landscape",
    area: "420 m²",
    year: "2024",
    value: "£1.9M",
    image: img.azure,
    alt: "Azure Pavilion, Cotswolds, UK",
    summary:
      "A dark-timber pool pavilion that dissolves into Cotswold hills and sky.",
    description:
      "Azure Pavilion is a leisure pavilion for an estate in the Cotswolds — dark timber, sliding glass, and an infinity edge that borrows the horizon. The building is deliberately low and quiet, so landscape remains the primary room. Changing light turns the pool into a mirror of weather and season.",
    approach:
      "Architecture and landscape were designed as one: plantings frame views, the deck aligns with the water plane, and services are concealed so the pavilion reads as a single precise object in the field.",
    scope: [
      "Pavilion architecture",
      "Pool & plant engineering",
      "Landscape framing",
      "Outdoor living fit-out",
    ],
    materials: ["Charred timber", "Glass", "Stone deck", "Bronze", "Water"],
    status: "Completed 2024",
  },
  {
    slug: "thornfield-gardens",
    title: "Thornfield Gardens",
    location: "Oxfordshire, UK",
    category: "Landscape",
    index: "04",
    collaborator: "Blac Nova Landscape",
    area: "4 ha",
    year: "2023",
    value: "£1.2M",
    image: img.thornfield,
    alt: "Thornfield Gardens, Oxfordshire, UK",
    summary:
      "Four hectares of formal garden rooms, water, and mature planting for an Oxfordshire estate.",
    description:
      "Thornfield Gardens restores structure to a historic estate landscape — clipped hedges, stone terraces, and an ornamental pond set among mature oaks. New outdoor rooms are layered for procession: arrival court, terrace, water garden, and meadow edge. The work balances formality with the softness of established trees.",
    approach:
      "We surveyed existing trees first, then drew rooms that protect canopy and sightlines. Stone, water, and hedge geometry do the heavy lifting; planting fills the seasons without clutter.",
    scope: [
      "Master landscape plan",
      "Stone terraces & paths",
      "Water garden",
      "Planting & hedging",
    ],
    materials: ["York stone", "Yew", "Oak", "Water", "Gravel"],
    status: "Completed 2023",
  },
  {
    slug: "meridian-tower",
    title: "Nova House",
    location: "Manchester, UK",
    category: "Family Home",
    index: "05",
    collaborator: "Blac Nova Construction",
    area: "890 m²",
    year: "2026",
    value: "£2.6M",
    image: img.nova,
    alt: "Nova House, Manchester, UK",
    summary:
      "A curved-glass family residence for Manchester — warm light, bronze detail, and a clear plan for daily life.",
    description:
      "Nova House is a contemporary family home with a curved glass façade that softens its urban edge. Bronze and silver cladding catch dusk light; warm interiors read through the glass after dark. The plan prioritises family flow — open living, quiet bedrooms, and a protected courtyard for children and planting.",
    approach:
      "Blac Nova Construction delivered the full build with architectural coordination from concept to snagging. Façade engineering, thermal performance, and interior finish were held to one specification set so the house feels continuous inside and out.",
    scope: [
      "Design & build",
      "Façade engineering",
      "Interior fit-out",
      "Courtyard landscape",
    ],
    materials: ["Curved glass", "Bronze", "Silver cladding", "Concrete", "Timber"],
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
  title: "The Hartley Residence",
  subtitle: "Mayfair, London · Project film",
  location: "Mayfair · London",
  duration: "Short cut",
  description:
    "A short cinematic walkthrough — light, material, and space in one glance. Play when you’re ready; it pauses when you scroll away.",
  poster: img.filmPoster,
  src: "https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4",
};

export const HERO_IMAGE =
  "https://storage.readdy-site.link/project_files/1e808465-d07f-41f3-9ec9-4b2428a7dabb/4fa74f34-415f-4f26-9f20-3e14d4813dc6_bdfe798200e06f2247cecaf65f3d0529.jpg?v=49c7b385495026c3762989350c7356c6";

export const CTA_IMAGE = img.cta;

export const teamAvatars = [img.avatar1, img.avatar2, img.avatar3];

export const OWNER = {
  image: "/owner.jpeg",
  role: "Founder & Principal",
  eyebrow: "About the practice",
  homeHeadline: "Led by one standard — homes built to be lived in for decades.",
  homeSummary:
    "Blac Nova is a construction and design practice shaped by its founder: clear briefs, honest materials, and accountability from drawing to handover.",
  aboutHeadline: "We build the homes people have carried in their minds for years.",
  aboutSummary:
    "Every project begins with listening — to the land, the brief, and how a family actually lives. Our founder leads the practice with the same measure on every site: proportion, material truth, and work that outlasts the moment it was finished.",
  aboutBody: [
    "Architecture, construction, and landscape sit under one roof so nothing is lost between the drawing and the build. Clients speak to people who stay with the project — not a revolving door of subcontractors guessing at intent.",
    "We favour calm rooms, durable finishes, and details you notice every day. Awards are welcome; the real test is whether the house still feels inevitable ten years on.",
  ],
};

export const reviews = [
  {
    quote:
      "Blac Nova does not merely construct buildings — they engineer the homes people have carried in their minds for years. Our residence feels inevitable, as if it had always belonged to the land.",
    name: "Sir Richard Holloway",
    role: "Private Client, Cotswolds",
    avatar: img.avatar2,
  },
  {
    quote:
      "Programme, quality, and cost stayed clear from foundation to final fixture. We always knew who owned the next decision — and the house matches the drawings we approved.",
    name: "Amelia Chen",
    role: "Private Client, Chelsea",
    avatar: img.avatar1,
  },
  {
    quote:
      "They treated landscape as architecture without a roof. The terrace, planting, and pool read as one room with the house — quiet, precise, and completely ours.",
    name: "Elena Vargas",
    role: "Private Client, Oxfordshire",
    avatar: img.avatar3,
  },
];
