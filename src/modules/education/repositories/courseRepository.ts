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

// --- Admin CRUD (not part of the public-read slice — implemented later) ---

export async function createCourse(_input: CourseInput, _createdById: string): Promise<Course> {
  throw new Error("courseRepository.createCourse not implemented (scaffold)");
}

export async function updateCourse(_id: string, _input: CourseUpdateInput): Promise<Course> {
  throw new Error("courseRepository.updateCourse not implemented (scaffold)");
}

export async function deleteCourse(_id: string): Promise<void> {
  throw new Error("courseRepository.deleteCourse not implemented (scaffold)");
}
