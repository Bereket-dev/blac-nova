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
    image:
      "https://readdy.ai/api/search-image?query=modern%20luxury%20hotel%20building%20exterior%20in%20London%20Mayfair%20with%20bronze%20and%20limestone%20facade%2C%20floor%20to%20ceiling%20glass%2C%20architectural%20photography%20at%20golden%20hour%2C%20warm%20interior%20light%20glowing%2C%20pure%20simple%20background%20of%20muted%20city%20sky%2C%20no%20people%2C%20editorial%20architectural%20photography&width=900&height=1100&seq=proj-hartley-01&orientation=portrait",
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
    image:
      "https://readdy.ai/api/search-image?query=minimalist%20modern%20luxury%20townhouse%20in%20London%20Chelsea%20with%20pale%20brick%20facade%2C%20large%20vertical%20windows%2C%20private%20garden%20visible%2C%20editorial%20architectural%20photography%2C%20soft%20overcast%20light%2C%20pure%20simple%20background%20of%20muted%20London%20sky%2C%20no%20people&width=900&height=1100&seq=proj-serpentine-02&orientation=portrait",
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
    image:
      "https://readdy.ai/api/search-image?query=modern%20glass%20pavilion%20pool%20house%20in%20English%20countryside%20with%20dark%20timber%20cladding%2C%20large%20sliding%20glass%20doors%20opening%20to%20landscape%2C%20infinity%20pool%20reflecting%20sky%2C%20editorial%20architectural%20photography%2C%20soft%20overcast%20light%2C%20pure%20simple%20background%20of%20muted%20green%20hills&width=900&height=1100&seq=proj-azure-03&orientation=portrait",
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
    image:
      "https://readdy.ai/api/search-image?query=formal%20English%20estate%20garden%20landscape%20with%20manicured%20hedges%2C%20stone%20terrace%2C%20ornamental%20pond%2C%20mature%20oak%20trees%2C%20editorial%20landscape%20architectural%20photography%2C%20soft%20golden%20hour%20light%2C%20pure%20simple%20background%20of%20muted%20sky%20and%20green%20foliage%2C%20no%20people&width=900&height=1100&seq=proj-thornfield-04&orientation=portrait",
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
    image:
      "https://readdy.ai/api/search-image?query=modern%20commercial%20office%20tower%20in%20Manchester%20UK%20with%20curved%20glass%20facade%2C%20bronze%20and%20silver%20cladding%2C%20architectural%20photography%20at%20dusk%20with%20warm%20interior%20lights%2C%20pure%20simple%20background%20of%20muted%20city%20sky%2C%20no%20people%2C%20editorial%20architectural%20photography&width=900&height=1100&seq=proj-meridian-05&orientation=portrait",
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
  poster:
    "https://readdy.ai/api/search-image?query=modern%20luxury%20hotel%20building%20exterior%20in%20London%20Mayfair%20with%20bronze%20and%20limestone%20facade%2C%20floor%20to%20ceiling%20glass%2C%20architectural%20photography%20at%20golden%20hour%2C%20warm%20interior%20light%20glowing%2C%20pure%20simple%20background%20of%20muted%20city%20sky%2C%20no%20people%2C%20editorial%20architectural%20photography&width=1440&height=900&seq=film-hartley-poster&orientation=landscape",
  src: "https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4",
};

export const HERO_IMAGE =
  "https://storage.readdy-site.link/project_files/1e808465-d07f-41f3-9ec9-4b2428a7dabb/4fa74f34-415f-4f26-9f20-3e14d4813dc6_bdfe798200e06f2247cecaf65f3d0529.jpg?v=49c7b385495026c3762989350c7356c6";

export const CTA_IMAGE =
  "https://readdy.ai/api/search-image?query=completed%20modern%20luxury%20hotel%20building%20exterior%20at%20twilight%20with%20warm%20interior%20lights%20glowing%20through%20floor%20to%20ceiling%20glass%20facade%2C%20bronze%20and%20limestone%20exterior%20cladding%2C%20architectural%20photography%20from%20street%20level%2C%20dramatic%20sky%20with%20deep%20blue%20and%20amber%20gradient%2C%20pure%20simple%20background%20of%20twilight%20sky%2C%20warm%20amber%20interior%20light%20contrasting%20cool%20exterior%2C%20editorial%20architectural%20photography%2C%20no%20people&width=1440&height=900&seq=cta-finished-01&orientation=landscape";

export const teamAvatars = [
  "https://readdy.ai/api/search-image?query=editorial%20black%20and%20white%20portrait%20of%20elegant%20european%20architect%20woman%20in%20her%20fifties%20with%20short%20silver%20hair%20against%20clean%20pale%20studio%20background%2C%20refined%20editorial%20fashion%20lighting%2C%20pure%20simple%20background&width=80&height=80&seq=avt-01&orientation=squarish",
  "https://readdy.ai/api/search-image?query=editorial%20black%20and%20white%20portrait%20of%20refined%20japanese%20man%20architect%20in%20his%20forties%20wearing%20dark%20turtleneck%20against%20clean%20pale%20studio%20background%2C%20editorial%20fashion%20lighting%2C%20pure%20simple%20background&width=80&height=80&seq=avt-02&orientation=squarish",
  "https://readdy.ai/api/search-image?query=editorial%20black%20and%20white%20portrait%20of%20sophisticated%20italian%20woman%20curator%20in%20her%20thirties%20with%20long%20dark%20hair%20against%20clean%20pale%20studio%20background%2C%20editorial%20fashion%20lighting%2C%20pure%20simple%20background&width=80&height=80&seq=avt-03&orientation=squarish",
];
