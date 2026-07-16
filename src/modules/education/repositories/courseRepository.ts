import { prisma } from "@/shared/db/prismaClient";
import type { Course as PrismaCourse } from "@prisma/client";
import type { Course } from "@/modules/education/types/course";
import type { CourseInput, CourseUpdateInput, CourseFilter } from "@/modules/education/validators/courseSchema";

// Data access for Course. ONLY this layer imports `prisma`; services depend on
// these functions, not on the ORM (CONTRIBUTING.md §6, §4).

/** Map a Prisma row → the ORM-independent domain `Course` (folds columns into objects). */
function toDomain(row: PrismaCourse): Course {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    hours: {
      total: row.totalHours,
      theory: row.theoryHours,
      practical: row.practicalHours,
    },
    pricing: {
      group: row.priceGroup,
      semiIndividual: row.priceSemiIndividual,
      individual: row.priceIndividual,
    },
    prerequisites: row.prerequisites,
    description: row.description,
    highlights: row.highlights,
    tag: row.tag,
    instructor: row.instructor,
    published: row.published,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function findAllCourses(filter: CourseFilter): Promise<Course[]> {
  const rows = await prisma.course.findMany({
    where: {
      ...(filter.publishedOnly ? { published: true } : {}),
      ...(filter.category ? { category: filter.category } : {}),
    },
    // createdAt asc preserves the original programs.ts ordering (seed insertion order).
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toDomain);
}

export async function findCourseBySlug(slug: string): Promise<Course | null> {
  const row = await prisma.course.findUnique({ where: { slug } });
  return row ? toDomain(row) : null;
}

export async function findCourseById(id: string): Promise<Course | null> {
  const row = await prisma.course.findUnique({ where: { id } });
  return row ? toDomain(row) : null;
}

/** Lightweight slug-only query for generateStaticParams. */
export async function findPublishedSlugs(): Promise<string[]> {
  const rows = await prisma.course.findMany({
    where: { published: true },
    select: { slug: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map((row) => row.slug);
}

/** Count courses, optionally restricted to published ones (admin dashboard). */
export async function countCourses(publishedOnly: boolean): Promise<number> {
  return prisma.course.count({ where: publishedOnly ? { published: true } : {} });
}

// --- Admin CRUD ---

export async function createCourse(input: CourseInput, createdById: string): Promise<Course> {
  const row = await prisma.course.create({
    data: {
      slug: input.slug,
      name: input.name,
      category: input.category,
      theoryHours: input.theoryHours,
      practicalHours: input.practicalHours,
      // totalHours is derived — never trusted from the client.
      totalHours: input.theoryHours + input.practicalHours,
      priceGroup: input.priceGroup,
      priceSemiIndividual: input.priceSemiIndividual,
      priceIndividual: input.priceIndividual,
      prerequisites: input.prerequisites,
      description: input.description,
      highlights: input.highlights,
      tag: input.tag,
      instructor: input.instructor,
      published: input.published,
      createdById,
    },
  });
  return toDomain(row);
}

export async function updateCourse(id: string, input: CourseUpdateInput): Promise<Course> {
  // Recompute the derived totalHours whenever either hours field changes.
  let totalHours: number | undefined;
  if (input.theoryHours !== undefined || input.practicalHours !== undefined) {
    const current = await prisma.course.findUniqueOrThrow({
      where: { id },
      select: { theoryHours: true, practicalHours: true },
    });
    const theory = input.theoryHours ?? current.theoryHours;
    const practical = input.practicalHours ?? current.practicalHours;
    totalHours = theory + practical;
  }

  const row = await prisma.course.update({
    where: { id },
    data: {
      ...(input.slug !== undefined ? { slug: input.slug } : {}),
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.theoryHours !== undefined ? { theoryHours: input.theoryHours } : {}),
      ...(input.practicalHours !== undefined ? { practicalHours: input.practicalHours } : {}),
      ...(totalHours !== undefined ? { totalHours } : {}),
      ...(input.priceGroup !== undefined ? { priceGroup: input.priceGroup } : {}),
      ...(input.priceSemiIndividual !== undefined
        ? { priceSemiIndividual: input.priceSemiIndividual }
        : {}),
      ...(input.priceIndividual !== undefined ? { priceIndividual: input.priceIndividual } : {}),
      ...(input.prerequisites !== undefined ? { prerequisites: input.prerequisites } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.highlights !== undefined ? { highlights: input.highlights } : {}),
      ...(input.tag !== undefined ? { tag: input.tag } : {}),
      ...(input.instructor !== undefined ? { instructor: input.instructor } : {}),
      ...(input.published !== undefined ? { published: input.published } : {}),
    },
  });
  return toDomain(row);
}

/**
 * Hard-delete a course. Callers MUST ensure it has no enrollments first — the
 * DB FK (Enrollment.course onDelete: Restrict) will otherwise reject the delete.
 * The admin UI unpublishes (soft-delete) instead of calling this.
 */
export async function deleteCourse(id: string): Promise<void> {
  await prisma.course.delete({ where: { id } });
}
