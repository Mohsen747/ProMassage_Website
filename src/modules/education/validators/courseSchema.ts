import { z } from "zod";

// Validates admin CMS course create/update input (/admin/courses/new, /[id]).

export const courseCategorySchema = z.enum([
  "Introductory",
  "ProfessionalDiploma",
  "ContinuingEducation",
]);

export const courseInputSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(3)
      .max(80)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a kebab-case slug"),
    name: z.string().trim().min(3).max(120),
    category: courseCategorySchema,
    theoryHours: z.number().int().min(0).max(2000),
    practicalHours: z.number().int().min(0).max(2000),
    priceGroup: z.number().int().min(0),
    priceSemiIndividual: z.number().int().min(0),
    priceIndividual: z.number().int().min(0),
    prerequisites: z.string().trim().max(500),
    description: z.string().trim().min(10).max(4000),
    highlights: z.array(z.string().trim().min(1).max(200)).min(1).max(12),
    tag: z.string().trim().min(1).max(40),
    instructor: z.string().trim().min(1).max(120),
    published: z.boolean().default(true),
  })
  .refine((v) => v.theoryHours + v.practicalHours > 0, {
    message: "Total hours must be greater than zero",
    path: ["theoryHours"],
  });

export const courseUpdateSchema = courseInputSchema.partial();

export const courseFilterSchema = z.object({
  category: courseCategorySchema.optional(),
  publishedOnly: z.boolean().default(true),
});

export type CourseInput = z.infer<typeof courseInputSchema>;
export type CourseUpdateInput = z.infer<typeof courseUpdateSchema>;
export type CourseFilter = z.infer<typeof courseFilterSchema>;
