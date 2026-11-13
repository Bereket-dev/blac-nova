import { img } from "./images";

export type { Project } from "./types";

export const marqueeItems = [
  "Dream homes delivered nationwide",
  "Architecture · Construction · Finishing",
  "Residential design & build",
  "Solid structure, clean handover",
  "Houses, G+ buildings & renovations",
  "We build your dream home",
];

export const PROJECT_FILM = {
  title: "Villa House, Dire Dawa",
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
