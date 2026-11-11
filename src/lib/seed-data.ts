import { img } from "./images";
import type { Project, ProjectCategory } from "./types";

export const seedCategories: ProjectCategory[] = [
  {
    id: "residences",
    label: "Houses & G+ Buildings",
    description: "Private houses, family homes, and G+ residential buildings for daily life.",
    order: 1,
  },
  {
    id: "leisure",
    label: "Guest House & Pool",
    description: "Guest houses and pool areas that sit cleanly with the main compound.",
    order: 2,
  },
  {
    id: "landscape",
    label: "Compound Works",
    description: "Paths, terraces, planting, and outdoor areas planned with the house.",
    order: 3,
  },
];

export const seedProjects: Project[] = [
  {
    slug: "private-villa-dire-dawa",
    title: "G+2 Private House",
    location: "Dire Dawa",
    category: "Private House",
    categoryId: "residences",
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
    details: [
      "G+2 private house with stone cladding and aluminum windows",
      "Living and kitchen on the ground floor; bedrooms above",
      "Wide openings to a shaded compound yard",
      "Finishes chosen for durability in daily use",
    ],
    status: "Completed 2025",
    order: 1,
    published: true,
  },
  {
    slug: "family-house-addis",
    title: "Family House",
    location: "Addis Ababa",
    category: "Residential",
    categoryId: "residences",
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
    details: [
      "Family house with a clear street front and private back garden",
      "Tall windows pulling daylight deep into the rooms",
      "Living on the garden side; quieter bedrooms above",
      "Cabinets, doors, and structure lined up as one build",
    ],
    status: "Completed 2024",
    order: 2,
    published: true,
  },
  {
    slug: "guest-house-pool",
    title: "Guest House & Pool",
    location: "Dire Dawa",
    category: "Guest House",
    categoryId: "leisure",
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
    details: [
      "Guest house beside the pool for a private compound",
      "Deck and outdoor seating for day and evening use",
      "Low, simple massing so the yard stays open",
      "Building and planting planned together",
    ],
    status: "Completed 2024",
    order: 3,
    published: true,
  },
  {
    slug: "compound-landscaping",
    title: "Compound Landscaping",
    location: "Adama",
    category: "Landscape",
    categoryId: "landscape",
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
    details: [
      "Compound outdoor areas across about 2,800 m²",
      "Clear path from entrance court to terrace and pond",
      "Existing trees kept where they give useful shade",
      "Stone, gravel, and planting doing the practical work",
    ],
    status: "Completed 2023",
    order: 4,
    published: true,
  },
  {
    slug: "g3-residential-dire-dawa",
    title: "G+3 Residential Building",
    location: "Dire Dawa",
    category: "Family Home",
    categoryId: "residences",
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
    details: [
      "G+3 residential building on a Dire Dawa city plot",
      "Warm interiors readable through the elevation after dark",
      "Plan built around family flow and a protected courtyard",
      "Design-and-build delivery under one continuous specification",
    ],
    status: "In progress — 2026",
    order: 5,
    published: true,
  },
];
