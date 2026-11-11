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
  order: number;
  published: boolean;
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
