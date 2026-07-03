import { z } from "zod";

// Shared Zod primitives reused across both modules' validators.

export const idSchema = z.string().cuid();

export const emailSchema = z.string().trim().toLowerCase().email();

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type Pagination = z.infer<typeof paginationSchema>;

// Canadian phone: lenient — normalized/validated more strictly at the service layer.
export const phoneSchema = z
  .string()
  .trim()
  .min(7)
  .max(20)
  .regex(/^[0-9+()\-\s]+$/, "Invalid phone number");
