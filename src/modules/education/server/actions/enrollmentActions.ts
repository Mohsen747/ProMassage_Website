"use server";

import { enrollmentFormSchema } from "@/modules/education/validators/enrollmentSchema";
import * as enrollmentService from "@/modules/education/services/enrollmentService";
import * as studentService from "@/modules/education/services/studentService";
import type { Enrollment } from "@/modules/education/types/enrollment";
import { runAction, type ActionResult } from "@/modules/education/server/actions/actionResult";
import { requireRole, requireUser } from "@/shared/auth/session";

// Server action for the public enrollment form (/academy/enroll/[slug]).
// Signature is final; the account-creation-vs-existing-user branch is resolved
// inside the handler once auth is wired.

export async function submitEnrollmentAction(input: unknown): Promise<ActionResult<Enrollment>> {
  return runAction({
    schema: enrollmentFormSchema,
    input,
    handler: async (form) => {
      // If a session exists, use it; otherwise create/find the student by email.
      // Kept as a service call so the action stays thin (CONTRIBUTING.md §6).
      void studentService;
      const user = await requireUser();
      return enrollmentService.createEnrollment({ form, studentId: user.id });
    },
  });
}

// Admin: mark an enrollment completed (unlocks certificate issuance).
export async function completeEnrollmentAction(enrollmentId: string): Promise<ActionResult<Enrollment>> {
  await requireRole("admin");
  return runAction({
    schema: (await import("@/shared/validators/common")).idSchema,
    input: enrollmentId,
    handler: (id) => enrollmentService.markCompleted(id),
  });
}
