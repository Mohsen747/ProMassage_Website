import type { Course, PublicCourse, CourseCategory } from "@/modules/education/types/course";
import type { CourseInput, CourseUpdateInput, CourseFilter } from "@/modules/education/validators/courseSchema";
import * as courseRepository from "@/modules/education/repositories/courseRepository";
import { NotFoundError } from "@/modules/education/constants/errors";

// Course business logic. Public reads strip non-group pricing (CLAUDE.md rule:
// only the group price is ever exposed on the website — surfaced as `fromPrice`).

export interface CourseStats {
  count: number;
  minHours: number;
  maxHours: number;
}

export interface PublicCoursesByCategory {
  introductory: PublicCourse[];
  diploma: PublicCourse[];
  continuingEducation: PublicCourse[];
}

export function toPublicCourse(course: Course): PublicCourse {
  const { pricing, published: _published, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = course;
  return { ...rest, fromPrice: pricing.group };
}

// --- Public reads (used by /academy/programs and /academy/[slug]) ---

export async function listPublicCourses(): Promise<PublicCourse[]> {
  const courses = await courseRepository.findAllCourses({ publishedOnly: true });
  return courses.map(toPublicCourse);
}

export async function findPublicCourseBySlug(slug: string): Promise<PublicCourse | null> {
  const course = await courseRepository.findCourseBySlug(slug);
  if (!course || !course.published) return null;
  return toPublicCourse(course);
}

export async function getPublishedSlugs(): Promise<string[]> {
  return courseRepository.findPublishedSlugs();
}

/** Pure aggregation over an already-fetched list (no extra DB round-trip). */
export function getPublicCourseStats(courses: PublicCourse[]): CourseStats {
  if (courses.length === 0) return { count: 0, minHours: 0, maxHours: 0 };
  const hours = courses.map((course) => course.hours.total);
  return {
    count: courses.length,
    minHours: Math.min(...hours),
    maxHours: Math.max(...hours),
  };
}

/** Pure split into the three display groups the programs page renders. */
export function partitionByCategory(courses: PublicCourse[]): PublicCoursesByCategory {
  const inCategory = (category: CourseCategory): PublicCourse[] =>
    courses.filter((course) => course.category === category);
  return {
    introductory: inCategory("Introductory"),
    diploma: inCategory("ProfessionalDiploma"),
    continuingEducation: inCategory("ContinuingEducation"),
  };
}

// --- Admin (full record, all tiers) — implemented in a later slice ---

export async function listAllCourses(filter: CourseFilter): Promise<Course[]> {
  return courseRepository.findAllCourses(filter);
}

export async function createCourse(input: CourseInput, adminId: string): Promise<Course> {
  return courseRepository.createCourse(input, adminId);
}

export async function updateCourse(id: string, input: CourseUpdateInput): Promise<Course> {
  const existing = await courseRepository.findCourseById(id);
  if (!existing) throw new NotFoundError("Course");
  return courseRepository.updateCourse(id, input);
}

export async function deleteCourse(id: string): Promise<void> {
  await courseRepository.deleteCourse(id);
}
