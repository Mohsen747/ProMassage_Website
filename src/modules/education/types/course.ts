// Domain types for the Education module. Deliberately independent of Prisma's
// generated types so UI/services depend on the domain, not the ORM.

export type CourseCategory =
  | "Introductory"
  | "ProfessionalDiploma"
  | "ContinuingEducation";

export interface CourseHours {
  total: number;
  theory: number;
  practical: number;
}

export interface CoursePricing {
  /** Public rate — the only tier shown on the website (CLAUDE.md pricing rule). */
  group: number;
  semiIndividual: number;
  individual: number;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  category: CourseCategory;
  hours: CourseHours;
  pricing: CoursePricing;
  prerequisites: string;
  description: string;
  highlights: string[];
  tag: string;
  instructor: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/** Public-facing course view — strips non-public pricing tiers. */
export interface PublicCourse {
  id: string;
  slug: string;
  name: string;
  category: CourseCategory;
  hours: CourseHours;
  fromPrice: number; // = pricing.group
  prerequisites: string;
  description: string;
  highlights: string[];
  tag: string;
  instructor: string;
}
