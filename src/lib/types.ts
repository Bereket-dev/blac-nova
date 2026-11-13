export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  categoryId: string;
  index: string;
  collaborator: string;
  area: string;
  year: string;
  image: string;
  imagePublicId?: string;
  alt: string;
  summary: string;
  description: string;
  approach: string;
  scope: string[];
  materials: string[];
  details: string[];
  status: string;
  /** Whether the project is still in progress (true = ongoing, false/undefined = completed) */
  isOngoing?: boolean;
  order: number;
  published: boolean;
  // ── Amharic translations (optional) ──────────────────────────
  title_am?: string;
  summary_am?: string;
  description_am?: string;
  approach_am?: string;
  status_am?: string;
};

export type ProjectCategory = {
  id: string;
  label: string;
  description: string;
  order: number;
};

export type DesignCategory = {
  id: string;
  label: string;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  sex: "male" | "female";
  order: number;
  featured: boolean;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  /** Optional: selected design title */
  designTitle?: string;
  /** Optional: design slug */
  designSlug?: string;
  /** Optional: design category label */
  designCategory?: string;
  /** Optional: free text message */
  message?: string;
  createdAt: number; // Unix ms timestamp
  handled: boolean;
  handledAt?: number;
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
