import { img } from "./images";
import type { Project, ProjectCategory, Testimonial } from "./types";

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
    title_am: "ጂ+2 የግል ቤት",
    location: "Dire Dawa",
    location_am: "ድሬ ዳዋ",
    category: "Houses & G+ Buildings",
    categoryId: "residences",
    index: "01",
    collaborator: "Blac Nova Architecture",
    area: "480 m²",
    year: "2025",
    image: img.projectG2,
    alt: "Lit balconies on a completed G+2 private house in Dire Dawa",
    summary:
      "A finished G+2 private house in Dire Dawa — clean frames, glass balconies, and warm night lighting across the elevation.",
    summary_am:
      "በድሬ ዳዋ የተጠናቀቀ ጂ+2 የግል ቤት — ንጹህ ፍሬም፣ የብርጭቆ በረንዳዎች እና በሌሊት የሚያበሩ ሙቅ መብራቶች።",
    description:
      "This completed G+2 private house shows a modern street elevation with glass balcony railings, recessed LED lines, and warm pendant lights. Aluminum framing and durable finishes keep the look sharp while the plan stays practical for family living on a city plot.",
    description_am:
      "ይህ የተጠናቀቀ ጂ+2 የግል ቤት ዘመናዊ የመንገድ ፊት አለው — የብርጭቆ በረንዳ፣ የተደበቁ የ LED መስመሮች እና ሙቅ መብራቶች። የአሉሚኒየም ፍሬም እና ዘላቂ ፊኒሽ በከተማ ቦታ ላይ ለቤተሰብ አገልግሎት ተስማሚ ያደርገዋል።",
    approach:
      "We handled design through construction: structure, elevations, and finishing as one job. From gate to entrance to upper floors, every stage was coordinated so the build matches the drawings.",
    approach_am:
      "ከንድፍ እስከ ግንባታ አንድ ስራ አድርገን አስተናግደናል — መዋቅር፣ ፊት እና ፊኒሽ በአንድ ዝርዝር። ከበር እስከ መግቢያና የላይኛ ፎቆች እያንዳንዱ ደረጃ ከስዕሎቹ ጋር እንዲስማማ ተቀናጅቷል።",
    scope: [
      "Architectural design",
      "Site supervision",
      "Interior finishing",
      "Compound landscaping",
    ],
    materials: ["Hollow block", "Stone cladding", "Aluminum windows", "Ceramic tile", "Paint"],
    details: [
      "Completed G+2 elevation with glass balconies and night lighting",
      "Recessed LED lines and warm pendant fixtures on each level",
      "Durable aluminum framing for daily city use",
      "Plan sized for family living on a Dire Dawa plot",
    ],
    status: "Completed 2025",
    status_am: "ተጠናቋል 2017 ዓ.ም",
    isOngoing: false,
    order: 1,
    published: true,
  },
  {
    slug: "family-house-addis",
    title: "Building",
    title_am: "ሕንፃ",
    location: "Dire Dawa",
    location_am: "ድሬ ዳዋ",
    category: "Houses & G+ Buildings",
    categoryId: "residences",
    index: "02",
    collaborator: "Blac Nova Construction",
    area: "320 m²",
    year: "2024",
    image: img.projectBuilding,
    alt: "Floor slab reinforcement with red form blocks on a Dire Dawa building site",
    summary:
      "An in-progress building in Dire Dawa — slab reinforcement over red form blocks, ready for the next concrete pour.",
    summary_am:
      "በድሬ ዳዋ በሂደት ላይ ያለ ሕንፃ — ከቀይ ፎርም ብሎኮች ላይ የስላብ ብረት ማጠናከሪያ፣ ለቀጣይ የኮንክሪት ማፍሰስ ዝግጁ።",
    description:
      "This ongoing building job is at the structural slab stage. Steel rebar is tied over lightweight red form blocks to create a strong, efficient floor deck. Column starters rise for the next level while site works stay coordinated for a clean pour.",
    description_am:
      "ይህ በሂደት ላይ ያለ የሕንፃ ስራ በመዋቅር ስላብ ደረጃ ላይ ነው። ቀላል ቀይ ፎርም ብሎኮች ላይ ብረት ተያይዞ ጠንካራና ቀልጣፋ የወለል ደረቅ ይሠራል። ለቀጣይ ፎቅ የአምድ ብረቶች ተነስተዋል፤ ጣቢያውም ለንጹህ የኮንክሪት ማፍሰስ ተቀናጅቷል።",
    approach:
      "Structure and site logistics are run as one sequence — form blocks, rebar layout, and pour timing — so each level rises true to the drawings.",
    approach_am:
      "መዋቅርና የጣቢያ ሎጂስቲክስ እንደ አንድ ቅደም ተከተል ይሠራሉ — ፎርም ብሎኮች፣ የብረት አቀማመጥ እና የማፍሰስ ጊዜ — እያንዳንዱ ፎቅ ከስዕሎቹ ጋር እንዲስማማ።",
    scope: [
      "Structural design coordination",
      "Slab & rebar installation",
      "Site supervision",
      "Concrete pour sequencing",
    ],
    materials: ["Reinforced concrete", "Rebar", "Form blocks", "Hollow block", "Timber formwork"],
    details: [
      "Ongoing slab reinforcement over red form blocks",
      "Column starters prepared for the next level",
      "Pour sequence planned with the site crew",
      "Dire Dawa city plot under active construction",
    ],
    status: "In progress",
    status_am: "በሂደት ላይ",
    isOngoing: true,
    order: 2,
    published: true,
  },
  {
    slug: "guest-house-pool",
    title: "Commercial Building",
    title_am: "የንግድ ሕንፃ",
    location: "Dire Dawa",
    location_am: "ድሬ ዳዋ",
    category: "Houses & G+ Buildings",
    categoryId: "residences",
    index: "03",
    collaborator: "Blac Nova Construction",
    area: "180 m²",
    year: "2024",
    image: img.projectCommercial,
    alt: "Foundation rebar cages for a commercial building under construction in Dire Dawa",
    summary:
      "A commercial building underway in Dire Dawa — foundation rebar cages and slab mesh set for the first major pour.",
    summary_am:
      "በድሬ ዳዋ በሂደት ላይ ያለ የንግድ ሕንፃ — ለመጀመሪያው ዋና ማፍሰስ የመሠረት ብረት ቅርጾች እና የስላብ መረብ ተዘጋጅተዋል።",
    description:
      "This commercial building is in early structural works. Vertical rebar cages mark the columns while a dense foundation mat covers the excavated pit. Timber staging and materials on site show an active, carefully staged build before concrete.",
    description_am:
      "ይህ የንግድ ሕንፃ በመጀመሪያ የመዋቅር ስራዎች ላይ ነው። ቀጥ ያሉ የብረት ቅርጾች አምዶቹን ያመለክታሉ፤ ጥቅጥቅ ያለ የመሠረት መረብም የተቆፈረውን ጉድጓድ ይሸፍናል። በጣቢያው ላይ ያሉ የእንጨት መድረኮችና ቁሳቁሶች ከኮንክሪት በፊት እንክብካቤ የተደረገ ግንባታን ያሳያሉ።",
    approach:
      "Foundation layout, column cages, and pour readiness are checked together so the commercial frame starts square, level, and strong.",
    approach_am:
      "የመሠረት አቀማመጥ፣ የአምድ ብረት ቅርጾች እና ለማፍሰስ ዝግጁነት አብረው ይረጋገጣሉ — የንግዱ ፍሬም ቀጥተኛ፣ ሚዛናዊ እና ጠንካራ እንዲጀምር።",
    scope: [
      "Foundation design & build",
      "Column rebar cages",
      "Slab mesh installation",
      "Site supervision",
    ],
    materials: ["Reinforced concrete", "Rebar", "Timber formwork", "Excavation", "Steel ties"],
    details: [
      "Foundation pit with column rebar cages in place",
      "Dense slab mesh prepared for the first pour",
      "Active commercial site staging in Dire Dawa",
      "Structure sequenced before vertical works rise",
    ],
    status: "In progress",
    status_am: "በሂደት ላይ",
    isOngoing: true,
    order: 3,
    published: true,
  },
  {
    slug: "compound",
    title: "Compound",
    title_am: "ግቢ",
    location: "Dire Dawa",
    location_am: "ድሬ ዳዋ",
    category: "Compound Works",
    categoryId: "landscape",
    index: "04",
    collaborator: "Blac Nova Landscape",
    area: "500 m²",
    year: "2025",
    image: img.projectCompound,
    alt: "Wooden pergola lounge and patio after compound landscaping in Dire Dawa",
    summary:
      "Compound works in Dire Dawa — the water tank went underground so the yard could become a lit outdoor lounge and garden.",
    summary_am:
      "በድሬ ዳዋ የግቢ ስራዎች — የውሃ ታንከሩ ከመሬት በታች ተቀምጧል፤ ግቢውም የሚያበራ የውጭ መቀመጫና የአትክልት ቦታ ሆኗል።",
    description:
      "We buried the water tank and rebuilt the yard as a finished outdoor room: a timber pergola, built-in seating, warm wall lights, tiled patio, and planting. The compound now reads clean and usable after dark instead of hosting exposed tanks and leftover ground.",
    description_am:
      "የውሃ ታንከሩን ከመሬት በታች አድርገን ግቢውን እንደ የተጠናቀቀ የውጭ ክፍል እንደገና ገንብተናል — የእንጨት ፐርጎላ፣ የተገነባ መቀመጫ፣ ሙቅ የግድግዳ መብራቶች፣ የታይል ፓቲዮ እና ተክሎች። ግቢው አሁን ከተጋለጡ ታንከሮችና ቀሪ መሬት ይልቅ በሌሊትም ንጹህና ለአገልግሎት ዝግጁ ይመስላል።",
    approach:
      "Utility relocation came first, then hardscape and lighting. Hiding the tank freed the center of the yard for seating, planting, and evening use.",
    approach_am:
      "መጀመሪያ የመገልገያ ማስተላለፍ፣ ከዚያም ሃርድስኬፕና መብራት። ታንከሩን መደበቅ የግቢውን መሃል ለመቀመጫ፣ ተክል እና የማታ አገልግሎት አስፈቷል።",
    scope: [
      "Underground water tank relocation",
      "Pergola & built-in seating",
      "Patio tiling & planting",
      "Outdoor lighting",
    ],
    materials: ["Timber", "Tile", "Planting", "Outdoor lighting", "Concrete"],
    details: [
      "Water tank moved underground to free the yard",
      "Timber pergola with built-in lounge seating",
      "Warm wall lighting for evening use",
      "Tiled patio and planting finishing the compound",
    ],
    status: "Completed 2025",
    status_am: "ተጠናቋል 2017 ዓ.ም",
    isOngoing: false,
    order: 4,
    published: true,
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "abebe-tadesse",
    quote:
      "Blac Nova builds the kind of house you can actually live in for years. Ours feels solid, finished properly, and right for the plot.",
    name: "Abebe Tadesse",
    role: "Private Client, Dire Dawa",
    avatar: img.avatar2,
    sex: "male" as const,
    order: 1,
    featured: true,
  },
  {
    id: "sara-mekonnen",
    quote:
      "Schedule, quality, and cost stayed clear from foundation to final fixing. We always knew who owned the next decision — and the house matches the drawings we approved.",
    name: "Sara Mekonnen",
    role: "Private Client, Addis Ababa",
    avatar: img.avatar1,
    sex: "female" as const,
    order: 2,
    featured: false,
  },
  {
    id: "daniel-haile",
    quote:
      "They treated the compound as part of the house. The terrace, planting, and pool work together with the building — clean, practical, and completely ours.",
    name: "Daniel Haile",
    role: "Private Client, Adama",
    avatar: img.avatar3,
    sex: "male" as const,
    order: 3,
    featured: false,
  },
];
