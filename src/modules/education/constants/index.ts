import type { CourseCategory } from "@/modules/education/types/course";

// Public category labels (English). Localized copy still lives in next-intl
// message bundles; these map DB enum values → display order/labels.
export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  Introductory: "Introductory",
  ProfessionalDiploma: "Professional Diploma",
  ContinuingEducation: "Continuing Education",
};

export const COURSE_CATEGORY_ORDER: CourseCategory[] = [
  "Introductory",
  "ProfessionalDiploma",
  "ContinuingEducation",
];

export const DEFAULT_CURRENCY = "CAD";

// Multipliers used to derive non-public tiers from the public group price.
export const PRICING_TIER_MULTIPLIER = {
  group: 1,
  semi_individual: 1.5,
  individual: 2,
} as const;
