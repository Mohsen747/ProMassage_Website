"use server";

import { z } from "zod";
import { courseInputSchema, courseUpdateSchema } from "@/modules/education/validators/courseSchema";
import * as courseService from "@/modules/education/services/courseService";
import type { Course } from "@/modules/education/types/course";
import { runAction, type ActionResult } from "@/modules/education/server/actions/actionResult";
import { requireRole } from "@/shared/auth/session";

// Admin course CMS actions (/admin/courses/new, /admin/courses/[id]).
// Public course reads are plain server-component calls to courseService — no
// action needed for reads.

export async function createCourseAction(input: unknown): Promise<ActionResult<Course>> {
  const admin = await requireRole("admin");
  return runAction({
    schema: courseInputSchema,
    input,
    handler: (data) => courseService.createCourse(data, admin.id),
  });
}

export async function updateCourseAction(id: string, input: unknown): Promise<ActionResult<Course>> {
  await requireRole("admin");
  return runAction({
    schema: courseUpdateSchema,
    input,
    handler: (data) => courseService.updateCourse(id, data),
  });
}

const setPublishedSchema = z.object({ published: z.boolean() });

// One-click publish/unpublish toggle (soft-delete style) for /admin/courses.
export async function setCoursePublishedAction(
  id: string,
  published: boolean
): Promise<ActionResult<Course>> {
  await requireRole("admin");
  return runAction({
    schema: setPublishedSchema,
    input: { published },
    handler: ({ published: next }) => courseService.setCoursePublished(id, next),
  });
}

export async function deleteCourseAction(id: string): Promise<ActionResult<{ id: string }>> {
  await requireRole("admin");
  return runAction({
    schema: (await import("@/shared/validators/common")).idSchema,
    input: id,
    handler: async (courseId) => {
      await courseService.deleteCourse(courseId);
      return { id: courseId };
    },
  });
}
